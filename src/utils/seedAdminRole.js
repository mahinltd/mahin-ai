const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdminRole = async () => {
    const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();

    if (!adminEmail) {
        console.warn('⚠️  ADMIN_EMAIL is not set. Skipping admin role seeding.');
        return;
    }

    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
        const bootstrapPassword = String(process.env.ADMIN_BOOTSTRAP_PASSWORD || '').trim();
        const bootstrapName = String(process.env.ADMIN_BOOTSTRAP_NAME || 'Mahin Admin').trim();

        if (!bootstrapPassword) {
            console.warn(`⚠️  No user found for ADMIN_EMAIL (${adminEmail}) and ADMIN_BOOTSTRAP_PASSWORD is missing. Skipping admin bootstrap.`);
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(bootstrapPassword, salt);

        await User.create({
            name: bootstrapName,
            email: adminEmail,
            authProvider: 'local',
            passwordHash,
            role: 'admin',
            accountStatus: 'active'
        });

        console.log(`👑 Admin account bootstrapped for: ${adminEmail}`);
        return;
    }

    let changed = false;

    if (adminUser.role !== 'admin') {
        adminUser.role = 'admin';
        changed = true;
    }

    if (adminUser.accountStatus !== 'active') {
        adminUser.accountStatus = 'active';
        changed = true;
    }

    if (changed) {
        await adminUser.save();
        console.log(`👑 Admin role seeded for: ${adminUser.email}`);
    } else {
        console.log(`👑 Admin role already seeded for: ${adminUser.email}`);
    }
};

module.exports = seedAdminRole;