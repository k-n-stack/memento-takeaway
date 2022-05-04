import { createSlice } from "@reduxjs/toolkit";
import { 
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
} from "../Thunks/userThunks";

export const login = fetchUserByEmailThunk();
export const register = fetchUserRegistrationThunk();
export const verify = fetchUserRegistrationVerificationThunk();
export const setUserThreadCount = fetchUserThreadCountThunk();
export const setUserBookmarkCount = fetchUserBookmarkCountThunk();
export const setUserRedirectionCount = fetchUserRedirectionCountThunk();
export const setUserCommentCount = fetchUserCommentCountThunk();
export const setUserInvalidComment = fetchUserInvalidCommentThunk();
export const setUserVoteCount = fetchUserVoteCountThunk();
export const setUserThreads = fetchUserThreadsThunk();
export const setUserPinnedThreads = fetchUserPinnedThreadsThunk();
export const setUserSubscribedGroups = fetchUserSubscribedGroupsThunk();
export const setUserOwnGroups = fetchUserOwnGroupsThunk();
export const setUserFriends = fetchUserFriendsThunk();
export const postBookmarks = postBookmarksThunk();
export const postThread = postThreadThunk();
export const updateBookmark = updateBookmarkThunk();
export const deactivateBookmark = deactivateBookmarkThunk();
export const postBookmarkTags = postBookmarkTagsThunk();
export const deleteBookmarkTags = deleteBookmarkTagsThunk();
export const deleteComments = deleteCommentsThunk();
export const validateComments = validateCommentsThunk();

export const userSlice = createSlice({
  
  name: "user",
  
  initialState: {
    alphanumeric_id: "",
    status: "",
    email: "",
    pseudonym: "",
    image_url: "",
    email_verified_at: "",

    threadCount: 0,
    bookmarkCount: 0,
    redirectionCount: 0,
    commentCount: 0,
    voteCount: 0,

    threads: [],
    pinnedThreads: [],

    subscribedGroups: [],
    ownGroups: [],

    friends: [],

    invalidComments: [],
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    clearUser: (state, action = "") => {
      state.status = "";
      state.email = "";
      state.pseudonym = "";
      state.image_url = "";
      state.email_verified_at = "";
      state.threadCount = 0;
      state.bookmarkCount = 0;
      state.redirectionCount = 0;
      state.commentCount = 0;
      state.voteCount = 0;
    },
  },
  
  extraReducers: {
    [login.rejected]: (state, action) => {},
    [login.pending]: (state, action) => {
      state.status = "pending login";
    },
    [login.fulfilled]: (state, action) => {
      state.alphanumeric_id = action.payload.alphanumeric_id;
      state.status = action.payload.status;
      state.email = action.payload.email;
      state.pseudonym = action.payload.pseudonym;
      state.image_url = action.payload.image_url;
      state.email_verified_at = action.payload.email_verified_at;
    },

    [register.rejected]: (state, action) => {},
    [register.pending]: (state, action) => {
      state.status = "pending registration";
    },
    [register.fulfilled]: (state, action) => {
      state.status = action.payload.status;
    },

    [verify.rejected]: (state, action) => {},
    [verify.pending]: (state, action) => {
      state.status = "pending verification";
    },
    [verify.fulfilled]: (state, action) => {
      state.status = action.payload.status;
    },

    [setUserThreadCount.rejected]: (state, action) => {},
    [setUserThreadCount.pending]: (state, action) => {},
    [setUserThreadCount.fulfilled]: (state, action) => {
      state.threadCount = action.payload;
    },

    [setUserBookmarkCount.rejected]: (state, action) => {},
    [setUserBookmarkCount.pending]: (state, action) => {},
    [setUserBookmarkCount.fulfilled]: (state, action) => {
      state.bookmarkCount = action.payload;
    },

    [setUserRedirectionCount.rejected]: (state, action) => {},
    [setUserRedirectionCount.pending]: (state, action) => {},
    [setUserRedirectionCount.fulfilled]: (state, action) => {
      state.redirectionCount = action.payload;
    },

    [setUserCommentCount.rejected]: (state, action) => {},
    [setUserCommentCount.pending]: (state, action) => {},
    [setUserCommentCount.fulfilled]: (state, action) => {
      state.commentCount = action.payload;
    },

    [setUserVoteCount.rejected]: (state, action) => {},
    [setUserVoteCount.pending]: (state, action) => {},
    [setUserVoteCount.fulfilled]: (state, action) => {
      state.voteCount = action.payload;
    },

    [setUserThreads.rejected]: (state, action) => {},
    [setUserThreads.pending]: (state, action) => {},
    [setUserThreads.fulfilled]: (state, action) => {
      state.threads = action.payload;
    },

    [setUserPinnedThreads.rejected]: (state, action) => {},
    [setUserPinnedThreads.pending]: (state, action) => {},
    [setUserPinnedThreads.fulfilled]: (state, action) => {
      state.pinnedThreads = action.payload;
    },

    [setUserSubscribedGroups.rejected]: (state, action) => {},
    [setUserSubscribedGroups.pending]: (state, action) => {},
    [setUserSubscribedGroups.fulfilled]: (state, action) => {
      state.subscribedGroups = action.payload;
    },

    [setUserOwnGroups.rejected]: (state, action) => {},
    [setUserOwnGroups.pending]: (state, action) => {},
    [setUserOwnGroups.fulfilled]: (state, action) => {
      state.ownGroups = action.payload;
    },

    [setUserFriends.rejected]: (state, action) => {},
    [setUserFriends.pending]: (state, action) => {},
    [setUserFriends.fulfilled]: (state, action) => {
      state.friends = action.payload;
    },

    [postBookmarks.rejected]: (state, action) => {},
    [postBookmarks.pending]: (state, action) => {},
    [postBookmarks.fulfilled]: (state, action) => {
      const threadAnids = action.payload.thread_anids;
      if (action.payload.status === "bookmark added") {
        state.threads = state.threads.map(function (thread) {
          if (threadAnids.includes(thread.alphanumeric_id)) {
            thread.bookmarks.push(action.payload.bookmark)
          }
          return thread;
        });
      }
    },

    [postThread.rejected]: (state, action) => {},
    [postThread.pending]: (state, action) => {},
    [postThread.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "thread added") {
        state.threads = state.threads.concat(action.payload.thread);
      }
    },

    [updateBookmark.rejected]: (state, action) => {},
    [updateBookmark.pending]: (state, action) => {},
    [updateBookmark.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "Bookmark updated") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.map(function (bookmark) {
            return bookmark.id === bookmarkId ? 
              action.payload.bookmark :
              bookmark;
          });
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [deactivateBookmark.rejected]: (state, action) => {},
    [deactivateBookmark.pending]: (state, action) => {},
    [deactivateBookmark.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "bookmark deleted") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.reduce(function (result, bookmark) {
            if (bookmark.id !== bookmarkId) {
              result.push(bookmark);
            }
            return result;
          }, []);
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [postBookmarkTags.rejected]: (state, action) => {},
    [postBookmarkTags.pending]: (state, action) => {},
    [postBookmarkTags.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "tags added to bookmark") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.map(function (bookmark) {
            return bookmark.id === bookmarkId ? 
              action.payload.bookmark :
              bookmark;
          });
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [deleteBookmarkTags.rejected]: (state, action) => {},
    [deleteBookmarkTags.pending]: (state, action) => {},
    [deleteBookmarkTags.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "tags removed from bookmark") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.map(function (bookmark) {
            return bookmark.id === bookmarkId ? 
              action.payload.bookmark :
              bookmark;
          });
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [deleteComments.rejected]: (state, action) => {},
    [deleteComments.pending]: (state, action) => {},
    [deleteComments.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "comments deleted") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.map(function (bookmark) {
            return bookmark.id == bookmarkId ? 
              action.payload.bookmark :
              bookmark;
          });
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [validateComments.rejected]: (state, action) => {},
    [validateComments.pending]: (state, action) => {},
    [validateComments.fulfilled]: (state, action) => {
      state.status = action.payload.status;
      if (action.payload.status === "comments validated") {
        const bookmarkId = action.payload.bookmark.id;
        state.threads = state.threads.map(function (thread) {
          const bookmarks = thread.bookmarks.map(function (bookmark) {
            return bookmark.id == bookmarkId ? 
              action.payload.bookmark :
              bookmark;
          });
          thread.bookmarks = bookmarks;
          return thread;
        });
      }
    },

    [setUserInvalidComment.rejected]: (state, action) => {},
    [setUserInvalidComment.pending]: (state, action) => {},
    [setUserInvalidComment.fulfilled]: (state, action) => {
      state.invalidComments = action.payload;
    },

  },

});

export const {
  setTestouille,
  setStatus,
  clearUser,
} = userSlice.actions;


export default userSlice.reducer;