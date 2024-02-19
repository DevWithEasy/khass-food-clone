const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/api';

export default apiUrl;