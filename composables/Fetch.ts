export const useApi = () => {
 const { apiUrl: apiUrl } = useRuntimeConfig().public;

 const headers = {
  accept: "*/*",
 };

 return {
  get: (url: String, options: any = {}) => {
   return $fetch(`${apiUrl}${url}`, {
    method: "GET",
    headers,
    query: {
     ...options,
    },
   });
  },
  post: (url: String, body: any = {}, options: any = {}) => {
   return $fetch(`${apiUrl}${url}`, {
    method: "POST",
    body,
    headers,
    ...options,
   });
  },
  put: (url: String, body: any = {}, options: any = {}) => {
   return $fetch(`${apiUrl}${url}`, {
    method: "PUT",
    body,
    headers,
    ...options,
   });
  },
  patch: (url: String, body: any = {}, options: any = {}) => {
   return $fetch(`${apiUrl}${url}`, {
    method: "PATCH",
    body,
    headers,
    ...options,
   });
  },
  delete: (url: String, options: any = {}) => {
   return $fetch(`${apiUrl}${url}`, {
    method: "DELETE",
    headers,
    ...options,
   });
  },
 };
};
