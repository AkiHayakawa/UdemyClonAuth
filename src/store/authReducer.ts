import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  cart: boolean;
};
type Login = {
  email: string;
  password: string;
};

type AuthMentor = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  type: string;
  experience: string;
  audience: string;
};
type Auth = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};
type Recovery = {
  email: string;
  password: string;
  password2: string;
};
type TodosState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

export const registerUser = createAsyncThunk<
  Todo,
  Auth,
  { rejectValue: string }
>("auth/registerUser", async (user) => {
  let formData = new FormData();
  formData.append("first_name", user.first_name);
  formData.append("last_name", user.last_name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("password2", user.password2);

  const { data } = await axios.post(
    `http://34.172.10.128/api/v1/account/register/`,
    formData,
    config
  );

  return data;
});
export const loginUser = createAsyncThunk<Todo, Login, { rejectValue: string }>(
  "auth/loginUser",
  async (user) => {
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    try {
      const { data } = await axios.post(
        `http://34.172.10.128/api/v1/account/login/`,
        formData,

        config
      );
      localStorage.setItem("token", JSON.stringify(data));
      localStorage.setItem("email", user.email);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgotPassword = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("auth/forgotPassword", async (email) => {
  let formData = new FormData();
  formData.append("email", email);
  return await axios.post(
    `http://34.172.10.128/api/v1/account/forgot_password/`,
    formData,
    config
  );
});
export const recoveryPassword = createAsyncThunk<
  undefined,
  Recovery,
  { rejectValue: string }
>("auth/recoveryPassword", async (user) => {
  let formData = new FormData();
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("password_confirm", user.password2);
  console.log(user);
  return await axios.post(
    `http://34.172.10.128/api/v1/account/forgot_password_confirm/`,
    formData,
    config
  );
});
export const registerMentor = createAsyncThunk<
  Todo,
  AuthMentor,
  { rejectValue: string }
>("auth/registerMentor", async (user) => {
  let formData = new FormData();
  formData.append("email", user.email);

  formData.append("first_name", user.first_name);
  formData.append("last_name", user.last_name);
  formData.append("password", user.password);
  formData.append("password2", user.password2);
  formData.append("type", user.type);
  formData.append("experience", user.experience);
  formData.append("audience", user.audience);

  const { data } = await axios.post(
    `http://34.172.10.128/api/v1/account/register/mentor/`,
    formData,
    config
  );
  return data;
});
export const checkAuth = createAsyncThunk<
  any,
  undefined,
  { rejectValue: string }
>("auth/checkAuth", async (_) => {
  let token = JSON.parse(localStorage.getItem("token") || "");

  try {
    const Authorization = `Bearer ${token.access}`;

    let res = await axios.post(
      `http://34.172.10.128/api/v1/account/api/token/refresh/`,
      { refresh: token.refresh },
      { headers: { Authorization } }
    );

    localStorage.setItem(
      "token",
      JSON.stringify({
        refresh: token.refresh,
        access: res.data.access,
      })
    );
    console.log("check");
  } catch (error) {
    console.log(error);
  }
});

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default AuthReducer.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
