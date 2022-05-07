import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const handleError = (error) => {
  let _error = { error: "" };
  switch(error.name) {
    case "TypeError" :
      _error.error = "API Error";
      break;
    case "SyntaxError" :
      _error.error = "Not found";
      break;
    default :
      _error.error = "Default Error, check API, Store, Thunks...";
  }
  return _error;
};

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

const baseUrl = "https://api.stack.mn/api"

const routes = {
  fetchUserByEmail: `${baseUrl}/login`,
  fetchUserAutoLogin: `${baseUrl}/user-info`,
  fetchUserRegistration: `${baseUrl}/register`,
  fetchUserThreadCount: `${baseUrl}/user-thread-count`,
  fetchUserBookmarkCount: `${baseUrl}/user-bookmark-count`,
  fetchUserRedirectionCount: `${baseUrl}/user-redirection-count`,
  fetchUserCommentCount: `${baseUrl}/user-comment-count`,
  fetchUserInvalidComment: `${baseUrl}/user-invalid-comment`,
  fetchUserVoteCount: `${baseUrl}/user-vote-count`,
  fetchUserThreads: `${baseUrl}/user-thread-full`,
  fetchUserPinnedThreads: `${baseUrl}/user-pinned`,
  fetchUserSubscribedGroups: `${baseUrl}/user-subscribed-group`,
  fetchUserOwnGroups: `${baseUrl}/user-own-group`,
  fetchUserFriends: `${baseUrl}/user-fellows`,
  postBookmarks: `${baseUrl}/post-bookmark`,
  postThread: `${baseUrl}/post-thread`,
  updateBookmark: `${baseUrl}/update-bookmark`,
  deactivateBookmark: `${baseUrl}/deactivate-bookmark`,
  postBookmarkTags: `${baseUrl}/post-bookmark-tags`,
  deleteBookmarkTags: `${baseUrl}/delete-bookmark-tags`,
  deleteComments: `${baseUrl}/delete-comments`,
  validateComments: `${baseUrl}/validate-comments`,
};

const fetchUserByEmailThunk = () => createAsyncThunk(
  "users/fetchUserByEmail",
  async (data, { rejectWithValue }) => {
    try {   
      // console.log('in fetch');   
      const { email, password } = data;
      const res = await fetch(routes.fetchUserByEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, 
          password,
        }),
      })
      .then(res => res.json())
      .then((res) => {
        save("stmn_token", res.token);
        return res;
      });

      return res;

    } catch (error) {
      // console.log(error);
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserAutoLoginThunk = () => createAsyncThunk(
  "users/fetchUserAutoLogin",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserAutoLogin, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserRegistrationThunk = () => createAsyncThunk(
  "users/fetchUserRegistration",
  async (data, { rejectWithValue }) => {
    try {
      const { email, pseudonym, password } = data;
      const res = await fetch(routes.fetchUserRegistration, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, 
          pseudonym,
          password,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserRegistrationVerificationThunk = () => createAsyncThunk(
  "users/fetchUserRegistrationVerification",
  async (url, { rejectWithValue }) => {
    try {
      return await fetch(url, {
        method: "GET",
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserThreadCountThunk = () => createAsyncThunk(
  "users/fetchUserThreadCount",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserThreadCount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserBookmarkCountThunk = () => createAsyncThunk(
  "users/fetchUserBookmarkCount",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserBookmarkCount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserRedirectionCountThunk = () => createAsyncThunk(
  "users/fetchUserRedirectionCount",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserRedirectionCount, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
          },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserCommentCountThunk = () => createAsyncThunk(
  "users/fetchUserCommentCount",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserCommentCount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserInvalidCommentThunk = () => createAsyncThunk(
  "user/fetchUserInvalidComment",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserInvalidComment, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserVoteCountThunk = () => createAsyncThunk(
  "user/fetchUserVoteCount",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserVoteCount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserThreadsThunk = () => createAsyncThunk(
  "user/fetchUserThreads",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserThreads, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserPinnedThreadsThunk = () => createAsyncThunk(
  "user/fetchUserPinnedThreads",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserPinnedThreads, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        }
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserSubscribedGroupsThunk = () => createAsyncThunk(
  "user/fetchUserSubscribedGroups",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserSubscribedGroups, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        }
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserOwnGroupsThunk = () => createAsyncThunk(
  "user/fetchUserOwnGroups",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserOwnGroups, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        }
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const fetchUserFriendsThunk = () => createAsyncThunk(
  "user/fetchUserFriends",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(routes.fetchUserFriends, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        }
      })
      .then(res => res.json());
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const postBookmarksThunk = () => createAsyncThunk(
  "user/postBookmarks",
  async (data, { rejectWithValue }) => {
    try {
      const { thread_anids, url, description, comment, tags } = data;
      const res = await fetch(routes.postBookmarks, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          thread_anids, 
          url,
          description,
          comment,
          tags,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const postThreadThunk = () => createAsyncThunk(
  "user/postThread",
  async (data, { rejectWithValue }) => {
    try {
      const { title, visibility, color } = data;
      const res = await fetch(routes.postThread, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          title,
          visibility,
          color,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const updateBookmarkThunk = () => createAsyncThunk(
  "user/updateBookmark",
  async (data, { rejectWithValue }) => {
    try {
      const { description, url, id } = data;
      const res = await fetch(routes.updateBookmark, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          description,
          url,
          id,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const deactivateBookmarkThunk = () => createAsyncThunk(
  "user/deactivateBookmark",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = data;
      const res = await fetch(routes.deactivateBookmark, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          id,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const postBookmarkTagsThunk = () => createAsyncThunk(
  "user/postBookmarkTagsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const { bookmark_id, tags } = data;
      const res = await fetch(routes.postBookmarkTags, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          bookmark_id,
          tags,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const deleteBookmarkTagsThunk = () => createAsyncThunk(
  "user/deleteBookmarkTagsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const { bookmark_id, tags } = data;
      const res = await fetch(routes.deleteBookmarkTags, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          bookmark_id,
          tags,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const deleteCommentsThunk = () => createAsyncThunk(
  "user/deleteCommentsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const { comments } = data;
      const res = await fetch(routes.deleteComments, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          comments,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const validateCommentsThunk = () => createAsyncThunk(
  "user/validateCommentsThunk",
  async (data, { rejectWithValue }) => {
    try {
      const { comments } = data;
      const res = await fetch(routes.validateComments, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await getValueFor('stmn_token')}`,
        },
        body: JSON.stringify({
          comments,
        }),
      })
      .then(res => res.json());
      return res;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);





export {
  fetchUserByEmailThunk,
  fetchUserRegistrationThunk,
  fetchUserRegistrationVerificationThunk,
  fetchUserThreadCountThunk,
  fetchUserBookmarkCountThunk,
  fetchUserRedirectionCountThunk,
  fetchUserCommentCountThunk,
  fetchUserInvalidCommentThunk,
  fetchUserVoteCountThunk,
  fetchUserThreadsThunk,
  fetchUserPinnedThreadsThunk,
  fetchUserSubscribedGroupsThunk,
  fetchUserOwnGroupsThunk,
  fetchUserFriendsThunk,
  postBookmarksThunk,
  postThreadThunk,
  updateBookmarkThunk,
  deactivateBookmarkThunk,
  postBookmarkTagsThunk,
  deleteBookmarkTagsThunk,
  deleteCommentsThunk,
  validateCommentsThunk,
  fetchUserAutoLoginThunk,
};