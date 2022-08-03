import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, removeToken } from '../states/userSlicer';

const BaseUrl = 'https://ecommerce-booksapp.herokuapp.com';

function useAxios() {
  const { access_token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const BaseAxios = axios.create({
    baseURL: BaseUrl,
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${access_token?.access}`,
    },
  });

  BaseAxios.interceptors.request.use(async (req) => {
    if (access_token.access) {
      const access = jwt_decode(access_token.access);

      const isExpired = dayjs.unix(access.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${access_token.access}`;
        return req;
      } else {
        try {
          const response = await axios.post(`${BaseUrl}/api/v1/jwt/refresh/`, {
            refresh: access_token.refresh,
          });
          if (response.status === 200) {
            req.headers.Authorization = `Bearer ${response.data.access}`;
            return req;
          } else {
            dispatch(removeToken);
            return req;
          }
        } catch (error) {
          dispatch(removeToken);
          return req;
        }
      }
    }

    return req;
  });

  return BaseAxios;
}

export default useAxios;
