/**
 * 👑 Mahin AI - Enterprise Admin Command Center Controller
 * পরিচালক ও সিইও: Tanvir Rahman (Mahin Ltd)
 */

const User = require('../models/User');
const Payment = require('../models/Payment');
const Config = require('../models/Config');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    প্ল্যাটফর্মের সব ইউজারের লিস্ট দেখা (অ্যাডমিন ড্যাশবোর্ড)
 * @route   GET /api/v1/admin/users
 * @access  Private (Admin Only)
 */
const getAllUsers = async (req, res) => {
    try {
        // পাসওয়ার্ড হ্যাশ বাদ দিয়ে সব ইউজারের ডেটা রেজিস্ট্রেশনের ক্রমানুসারে আনা
        const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, users });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
};

/**
 * @desc    ইউজার অ্যাকাউন্ট স্ট্যাটাস চেঞ্জ (Ban / Unban User)
 * @route   PUT /api/v1/admin/user-status/:id
 * @access  Private (Admin Only)
 */
const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body; // status: 'active' | 'banned'
        
        if (!['active', 'banned'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status type.' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { accountStatus: status }, 
            { new: true }
        ).select('-passwordHash');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ 
            success: true, 
            message: `User account status successfully updated to ${status}.`, 
            user 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    পেন্ডিং পেমেন্ট রিকোয়েস্টগুলোর লিস্ট দেখা
 * @route   GET /api/v1/admin/payments/pending
 * @access  Private (Admin Only)
 */
const getPendingPayments = async (req, res) => {
    try {
        // পেমেন্টের সাথে ইউজারের নাম ও ইমেইল পপুলেট (Join) করে আনা
        const payments = await Payment.find({ status: 'pending' })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, count: payments.length, payments });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch pending payments' });
    }
};

/**
 * @desc    ম্যানুয়াল পements অ্যাপ্রুভ বা রিজেক্ট করা
 * @route   PUT /api/v1/admin/payment-action/:id
 * @access  Private (Admin Only)
 */
const processPaymentAction = async (req, res) => {
    try {
        const { action } = req.body; // action: 'approved' | 'rejected'
        
        if (!['approved', 'rejected'].includes(action)) {
            return res.status(400).json({ success: false, message: 'Invalid action. Use approved or rejected.' });
        }

        const payment = await Payment.findById(req.params.id).populate('userId');
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment record not found.' });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'This transaction has already been processed.' });
        }

        // পেমেন্ট স্ট্যাটাস আপডেট করা
        payment.status = action;
        await payment.save();

        if (action === 'approved') {
            // ইউজারের প্ল্যান আপগ্রেড করে 'pro' করা
            await User.findByIdAndUpdate(payment.userId._id, { currentPlan: 'pro' });

            // ইউজারকে প্রফেশনাল সাকসেস ইমেইল পাঠানো
            const successHtml = `
                <h2>Payment Approved! Welcome to Mahin AI Pro</h2>
                <p>Dear ${payment.userId.name},</p>
                <p>We have verified your transaction (TrxID: <strong>${payment.transactionId}</strong>) via ${payment.gateway.toUpperCase()}.</p>
                <p>Your subscription has been successfully upgraded to the <strong>Pro Plan</strong>.</p>
                <p>Enjoy elite access to all our advanced models without restrictions.</p>
                <br>
                <p>Best Regards,</p>
                <p><strong>Tanvir Rahman</strong><br>Director & CEO, Mahin Ltd</p>
            `;
            sendEmail(payment.userId.email, '⚡ Mahin AI - Pro Plan Activated!', successHtml);
        }

        res.status(200).json({ success: true, message: `Payment has been successfully ${action}.` });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    লাইভ সিস্টেম কনফিগারেশন ও কিল-সুইচ কন্ট্রোল আপডেট করা
 * @route   PUT /api/v1/admin/config-update
 * @access  Private (Admin Only)
 */
const updateSystemConfig = async (req, res) => {
    try {
        // ফ্রন্টএন্ড বডি থেকে আপডেট করার জন্য নতুন ভ্যালুগুলো নেওয়া
        const updates = req.body;

        // ডাটাবেজে যদি একটিও কনফিগ ডকুমেন্ট থাকে, সেটি আপডেট হবে। না থাকলে নতুন তৈরি হবে।
        let config = await Config.findOne();
        
        if (!config) {
            config = new Config(updates);
        } else {
            // অবজেক্টের প্রোপার্টিগুলো ডাইনামিকালি মার্চ করা
            Object.assign(config, updates);
        }

        await config.save();
        res.status(200).json({ success: true, message: 'Live system configurations successfully updated.', config });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUserStatus,
    getPendingPayments,
    processPaymentAction,
    updateSystemConfig
};