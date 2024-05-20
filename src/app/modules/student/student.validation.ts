import Joi from 'joi'

const userNameJoiSchema = Joi.object({
    firstName: Joi.string().required().trim().custom((value, helpers) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (firstNameStr !== value) {
        return helpers.message({ custom: "Value is not in capitalize format" });
      }
      return value;
    }, 'capitalize format validation'),
    middleName: Joi.string().trim(),
    lastName: Joi.string().required().trim().alphanum(),
  });
  
  const guardianJoiSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherContactNo: Joi.string().required(),
    motherOccupation: Joi.string().required(),
  });
  
  const localGuardianJoiSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  });
  
  const studentJoiSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameJoiSchema.required(),
    gender: Joi.string().valid('female', 'male', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloogGroup: Joi.string().valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddres: Joi.string().required(),
    guardian: guardianJoiSchema.required(),
    localGuardian: localGuardianJoiSchema.required(),
    profileImg: Joi.string().required(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
  });

export default studentJoiSchema;