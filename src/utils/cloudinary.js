/**
 * 🎨 Mahin AI - Cloudinary Asset Management Utility
 * পরিচালক ও সিইও: Tanvir Rahman (Mahin Ltd)
 */

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// .env ফাইল থেকে ক্লাউডিনারি কনফিগার করা
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * ক্লাউডিনারিতে ইমেজ আপলোড করার ফাংশন
 * @param {String} fileBufferOrUrl - ইমেজের বাফার ডেটা বা সাময়িক ইউআরএল
 * @param {String} folderName - ক্লাউডিনারির ভেতরের ফোল্ডার (যেমন: 'user_images', 'ai_generated')
 * @returns {Object} - আপলোড হওয়া ইমেজের সিকিউর ইউআরএল এবং পাবলিক আইডি
 */
const uploadToCloudinary = async (fileBufferOrUrl, folderName = 'mahin_ai_assets') => {
    try {
        const result = await cloudinary.uploader.upload(fileBufferOrUrl, {
            folder: folderName,
            resource_type: 'auto', // ইমেজ, ভিডিও বা অন্য কোনো ফাইল অটো ডিটেক্ট করবে
            quality: 'auto:good'   // অপ্টিমাইজড সাইজ ও গুড কোয়ালিটি নিশ্চিত করবে
        });

        return {
            secure_url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error(`❌ Cloudinary Upload Error: ${error.message}`);
        throw new Error('Image upload to cloud failed.');
    }
};

module.exports = { uploadToCloudinary };