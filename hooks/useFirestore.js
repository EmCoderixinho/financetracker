import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
let initalState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, error: null, isPending: true, succes: false };

    case "ADD_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    
      case "DELETE_DOCUMENT":
        return{

            isPending: false,
            document: null,
            succes: true,
            error: null,
        }

    case "ERROR":
      return {
        isPending: false,
        error: action.payload,
        succes: false,
        document: null,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initalState);
  const [isCancelled, setIsCanceled] = useState(false);

  const ref = projectFirestore.collection(collection);

  const dispatchIfNotCanceled = (action) => {
    if (!isCancelled) dispatch(action);
  };

  //add document
  const addDocument = async (doc) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({...doc, createdAt});

      dispatchIfNotCanceled({ type: "ADD_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCanceled({ type: "ERROR", payload: err.message });
    }
  };

  //delete document
  const deleteDocument = async (id) => {

    dispatchIfNotCanceled({ type: "IS_PENDING" });

    try {
        await ref.doc(id).delete()
        dispatchIfNotCanceled({type:"DELETE_DOCUMENT"})
    } catch (error) {
        
        dispatchIfNotCanceled({ type: "ERROR", payload: 'could not delete message' });
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  });

  return { addDocument, deleteDocument, response };
};
