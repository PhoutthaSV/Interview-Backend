import bcrypt from 'bcrypt'
export const comparePassword = async (pass,hashedPassword)=>{
    try {
        const result = await bcrypt.compare(pass, hashedPassword);
        if (result) {
            return { resultStatus: true, resultDesc: "Operation success" };
        } else {
            return { resultStatus: false, resultDesc: "Password is incorrect" };
        }
    } catch (error) {
        return { resultStatus: false, resultDesc: "Error comparing passwords", error: error.message };
    }
}
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};