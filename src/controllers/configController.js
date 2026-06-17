/**
 * 🌐 Mahin AI - Public Configuration Controller
 * পরিচালক ও সিইও: Tanvir Rahman (Mahin Ltd)
 */

const Config = require('../models/Config');
const logger = require('../utils/logger');

/**
 * @desc    Get public system configuration (pricing, model names, etc.)
 * @route   GET /api/v1/config
 * @access  Public
 */
const getPublicConfig = async (req, res) => {
    try {
        let config = await Config.findOne().select('modelNameLight modelNamePro modelNameMax isProModelActive isMaxModelActive priceBDT priceUSD').lean();
        
        if (!config) {
            config = await Config.create({});
            config = config.toObject();
        }

        return res.status(200).json({
            success: true,
            config: {
                modelNameLight: config.modelNameLight || 'MahinAi-Light',
                modelNamePro: config.modelNamePro || 'MahinAi-Pro',
                modelNameMax: config.modelNameMax || 'MahinAi-Max',
                isProModelActive: config.isProModelActive !== false,
                isMaxModelActive: config.isMaxModelActive !== false,
                priceBDT: config.priceBDT || 299,
                priceUSD: config.priceUSD || 5
            }
        });
    } catch (error) {
        logger.error('Get public config failed', { error: error.message });
        return res.status(500).json({ success: false, message: 'Failed to fetch configuration' });
    }
};

module.exports = { getPublicConfig };
