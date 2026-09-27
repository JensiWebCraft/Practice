import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyDescription,
      industry,
      companySize,
      foundedYear,
      companyType,
      country,
      state,
      city,
      address,
      pincode,
      linkedin,
      twitter,
      facebook,
      instagram,
      hrName,
      hrEmail,
      hrPhone,
    } = req.body;

    const company = await Company.create({
      owner: req.user.userId,

      companyName,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyDescription,

      industry,
      companySize,
      foundedYear,
      companyType,

      country,
      state,
      city,
      address,
      pincode,

      socialLinks: {
        linkedin,
        twitter,
        facebook,
        instagram,
      },

      hrName,
      hrEmail,
      hrPhone,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      owner: req.user.userId,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMyCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      {
        owner: req.user.userId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};