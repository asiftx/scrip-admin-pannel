// export const BASE_URL = "https://pix2igp54z.ap-northeast-1.awsapprunner.com/";
// export const BASE_URL = "https://hcpxrfggs3.us-east-2.awsapprunner.com/";
export const BASE_URL = "http://localhost:4500/";

export default {
  // -----AUTH------//
  getAllUser: BASE_URL + "user",
  signUp: BASE_URL + "user/signup",
  signIn: BASE_URL + "user/testLogin",
  blockUser: BASE_URL + "user/updateProfile",
  approveCourse: BASE_URL + "updateCourse",
  deleteUser: BASE_URL + "user",
  getSubscribers: BASE_URL + "api/v1/subscribers",
  getUserMessage: BASE_URL + "api/v1/getInTouch",
  updateCourse: BASE_URL + "updateCourse",
  updateUser: BASE_URL + "user",
  updateFAQs: BASE_URL + "faqs/updatefaq",
  getAbout: BASE_URL + "api/v1/aboutUs",
  updateAbout: BASE_URL + "api/v1/aboutUs",
  createFAQs: BASE_URL + "api/v1/fAQS",
  deletePagePost: BASE_URL + "pagePost",
  getCommunityPosts: BASE_URL + "communityPost",
  deleteCommunityPost: BASE_URL + "communityPost",
  getCommunityEvents: BASE_URL + "communityEvent",
  deleteCommunityEvent: BASE_URL + "communityEvent",
  deleteFAQs: BASE_URL + "faqs/delete",
  getPrivacyPolicy: BASE_URL + "privacy",
  deletePrivacyPolicy: BASE_URL + "privacyPolicy",
  getFAQs: BASE_URL + "api/v1/FAQS",
  deleteFAQs: BASE_URL + "api/v1/FAQS",
  addFAQs: BASE_URL + "api/v1/FAQS",
  updatePrivacyPolicy: BASE_URL + "privacy",
  getTermsOfUse: BASE_URL + "termsandcondition",
  updateTermsOfUse: BASE_URL + "termsandcondition",
  getJobs: BASE_URL + "job",
  getMedTypes: BASE_URL + "api/v1/medicineTypes",
  updateMedType: BASE_URL + "api/v1/medicineTypes",
  deleteMedType: BASE_URL + "api/v1/medicineTypes",
  addType: BASE_URL + "api/v1/medicineTypes",
  forgotPassword: BASE_URL + "user/forgotPassword",
  resetPassword: BASE_URL + "user/resetPassword",
  verifyOTPresetPassword: BASE_URL + "user/verifyOTPResetPassword",
  logOut: BASE_URL + "user/logout",
  updateUser: BASE_URL + "user",
  //category module admin side
  getMedicines: BASE_URL + "medicine",
  getOrders: BASE_URL + "order/getAllOrders",
  getPharmacies: BASE_URL + "pharmacy",

  getAllReviews: BASE_URL + "review/getAll",

  // -------------Services-------------//
};
