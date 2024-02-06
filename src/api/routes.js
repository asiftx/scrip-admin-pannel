// export const BASE_URL = "https://pix2igp54z.ap-northeast-1.awsapprunner.com/";
export const BASE_URL = "https://xdkgzpzsen.eu-west-2.awsapprunner.com/api/v1/";
// export const BASE_URL = "http://localhost:4500/";

export default {
  // -----AUTH------//
  getAllUser: BASE_URL + "user",
  signUp: BASE_URL + "user/signup",
  signIn: BASE_URL + "user/adminLogin",
  blockUser: BASE_URL + "user/updateProfile",
  approveCourse: BASE_URL + "updateCourse",
  deleteUser: BASE_URL + "user",
  getCommunities: BASE_URL + "community",
  getCourses: BASE_URL + "course",
  updateCourse: BASE_URL + "updateCourse",
  updateCourse: BASE_URL + "updateCourse",
  updateFAQs: BASE_URL + "faqs/updatefaq",
  rejectCourse: BASE_URL + "rejectCourse",
  getPagePost: BASE_URL + "page",
  getPagePosts: BASE_URL + "pagePost",
  createFAQs: BASE_URL + "faqs/create",
  deletePagePost: BASE_URL + "pagePost",
  getCommunityPosts: BASE_URL + "communityPost",
  deleteCommunityPost: BASE_URL + "communityPost",
  getCommunityEvents: BASE_URL + "communityEvent",
  deleteCommunityEvent: BASE_URL + "communityEvent",
  deleteFAQs: BASE_URL + "faqs/delete",
  getPrivacyPolicy: BASE_URL + "privacy",
  deletePrivacyPolicy: BASE_URL + "privacyPolicy",
  getFAQs: BASE_URL + "faqs",
  updatePrivacyPolicy: BASE_URL + "privacy",
  getTermsOfUse: BASE_URL + "termsOfUse",
  updateTermsOfUse: BASE_URL + "termsOfUse",
  deleteTermsOfUse: BASE_URL + "termsOfUse",
  getJobs: BASE_URL + "job",
  deleteJob: BASE_URL + "job",
  sendOTP: BASE_URL + "user/sendOTP",
  verifyOTP: BASE_URL + "user/verify",
  forgotPassword: BASE_URL + "user/forgotPassword",
  resetPassword: BASE_URL + "user/resetPassword",
  verifyOTPresetPassword: BASE_URL + "user/verifyOTPResetPassword",
  logOut: BASE_URL + "user/logout",
  updateUser: BASE_URL + "user",
  //category module admin side
  getMedicines: BASE_URL + "medicine",
  getOrders: BASE_URL + "order/getAllOrders",
  getPharmacies: BASE_URL + "pharmacy",
  // -----------Products--------------//

  getProducts: BASE_URL + "/product/getAll?limit=1000",
  upDateProduct: BASE_URL + "/product/update",
  createProduct: BASE_URL + "/product/create",
  deleteProduct: BASE_URL + "/product/delete",
  allBookedProduct: BASE_URL + "/booking/allbookedproducts",
  // -------------Services-------------//

  getAllServices: BASE_URL + "/service/getall",
  createService: BASE_URL + "/service/create",
  deleteService: BASE_URL + "/service/delete",
  updateService: BASE_URL + "/service/update",
  allBookedServices: BASE_URL + "/booking/allbookedservices",

  // -------------Services-------------//
};
