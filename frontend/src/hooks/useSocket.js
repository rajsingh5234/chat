import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { connectSocket, socket } from "../utils/socketManager";
import { ACCESS_TOKEN, USER_DATA, getLocalStorageItem, removeLocalStorageItem } from "../utils/localStroageManager";
import { useDispatch } from "react-redux";
import { addNewRecievedRequest, removeRecievedRequests, removeSentRequests } from "../redux/slices/appConfigSlice";
import { addChat, addNewMessage, deleteMessage, removeChat, updateChat, updateMessage } from "../redux/slices/chatSlice";
import translate from 'translate';
import { addFriend } from "../redux/slices/connectionSlice";

const useSocket = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   // const translateText = async (text, targetLang) => {
   //    if (!text || !targetLang) return text;
   //    try {
   //       const translated = await translate(text, targetLang);
   //       return translated;
   //    } catch (error) {
   //       console.error("Translation error:", error);
   //       return text;
   //    }
   // };

   const socketConnector = async (token) => {
      await connectSocket(token);
   }

   useEffect(() => {

      translate.engine = "google";

      const token = getLocalStorageItem(ACCESS_TOKEN);

      if (!token) return;

      socketConnector(token);

      // socket?.on('connect', () => {
      //    toast.success("Socket connected");
      // });

      const handleSocketErrors = (e) => {
         console.log('socket error', e);
         toast.error('Socket connection failed, try again later.');
      }

      socket?.on('connect_error', (err) => handleSocketErrors(err));
      socket?.on('connect_failed', (err) => handleSocketErrors(err));

      socket?.on("unauthorized", () => {
         removeLocalStorageItem(ACCESS_TOKEN, USER_DATA);
         navigate("/login");
      })

      socket?.on("joined-room", () => {
         toast.success("Welcome")
      })

      socket?.on("new-request", ({ request }) => {
         dispatch(addNewRecievedRequest(request))
      })

      socket?.on("delete-request", ({ requestId }) => {
         dispatch(removeRecievedRequests(requestId));
         dispatch(removeSentRequests(requestId));
      })

      socket?.on("accept-request", ({ requestId, chat }) => {
         dispatch(removeSentRequests(requestId));
         dispatch(addChat(chat));
         dispatch(addFriend(chat));
      })

      socket?.on("new-message", async ({ message }) => {
         // const translatedText = await translateText(message.text, "hi")
         // const translatedMessage = { ...message, text: translatedText }
         dispatch(addNewMessage(message));
      })

      socket?.on("new-message-chat", ({ chat }) => {
         dispatch(updateChat(chat));
      })

      socket?.on("updated-message", ({ message }) => {
         dispatch(updateMessage(message))
      })

      socket?.on("deleted-message", ({ message }) => {
         dispatch(deleteMessage(message))
      })

      socket?.on("new-group-chat", ({ chat }) => {
         dispatch(addChat(chat));
      })

      socket?.on("update-group-chat", ({ chat }) => {
         dispatch(updateChat(chat));
      })

      socket?.on("remove-group-chat", ({ chat }) => {
         dispatch(removeChat(chat));
         toast.success(`You are removed from ${chat.groupName} group`);
      })

      return () => {
         socket?.off("unauthorized");
         socket?.off("joined-room");
         socket?.off("new-request");
         socket?.off("delete-request");
         socket?.off("accept-request");
         socket?.off("new-message");
         socket?.off("new-message-chat");
         socket?.off("updated-message");
         socket?.off("deleted-message");
         socket?.off("new-group-chat");
         socket?.off("update-group-chat");
         socket?.off("remove-group-chat");
         socket?.disconnect();
      }
   }, [])
};

export default useSocket;
