import { collection, doc, getDocs, getDoc, setDoc, addDoc, serverTimestamp, orderBy, query, where, limit } from "firebase/firestore";
import { db } from "./firebase"; // Ensure correct path to Firebase config

const blogsCollection = 'blog_framing_norah'; // Name of the Firestore collection   
const blogsRef = collection(db, blogsCollection);

export const getBlogBySlug = async function(slug) {
  try {
    const blogsQuery = query(blogsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(blogsQuery);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const blogData = docSnapshot.data();
      blogData.id = docSnapshot.id;
      return blogData;
    } else {
      console.error(`No blog found with slug: ${slug}`);
      return null;
    }
  } catch (err) {
    console.error('Error fetching blog by slug:', err.message);
    throw err;
  }
};

// Function to get a single blog by its ID from the 'blog_speirsy' collection
export const getBlog = async function(id) {
    try {
        const docRef = doc(db, blogsCollection, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const blogData = docSnapshot.data();
            blogData.id = docSnapshot.id; // Include the ID in the returned data
            return blogData;
        } else {
            console.error(`No blog found with ID: ${id}`);
            return null;
        }
    } catch (err) {
        console.error("Error fetching blog by ID:", err.message);
        throw err; // Propagate the error to handle it in the calling function
    }
};

// Function to get a list of all blogs, ordered by timestamp in descending order
export const getBlogs = async function() {
    try {
        const blogsQuery = query(blogsRef, orderBy('timestamp', 'desc'));
        const blogsSnapshot = await getDocs(blogsQuery);
        
        let blogs = [];
        blogsSnapshot.docs.forEach(doc => {
            let blog = doc.data();
            blog.id = doc.id; // Use Firestore's document ID
            blogs.push(blog);
        });

        return blogs; // Return the array of blogs
    } catch (err) {
        console.error("Error fetching blogs:", err.message);
        return [];
    }
};

// Function to add a new blog or update an existing one in the 'blog_speirsy' collection
export const saveBlog = async function(blog) {
    try {
        let docRef;

        // Add or update the timestamp in the blog object
        const blogWithTimestamp = {
            ...blog,
            timestamp: serverTimestamp() // Ensure the timestamp is set properly
        };

        // If the blog has an ID, it's an update, so use the existing document ID
        if (blog.id) {
            docRef = doc(db, blogsCollection, blog.id);
            await setDoc(docRef, blogWithTimestamp); // Update the document
        } else {
            // If no ID, use the slug as the document ID for new blogs
            docRef = doc(blogsRef, blog.slug);
            await setDoc(docRef, blogWithTimestamp);
        }

        // Return the saved blog with the document ID
        return { ...blogWithTimestamp, id: docRef.id };
    } catch (err) {
        console.error("Error saving blog:", err.message);
        throw err;
    }
};

// import { collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "./firebase";
// const blogsCollection = 'blog_framing_norah';
// const blogsRef = collection(db, blogsCollection);

// // Gets a list of all blogs from the blgs collection
// export const getBlogs = async function(){
//     try {
//         const blogsSnapshot = await getDocs(blogsRef)
//         let blogs = [];
//         blogsSnapshot.docs.forEach(s => {
//             let blog = s.data();
//             blog.id = s.id;
//             blogs.push(blog);
//         });
//         return blogs;
//     }
//     catch(err){
//         console.error(err.message);
//         return [];
//     }
// }

// // Gets a blog from the blogs collection by their id 
// export const getBlog = async function(id){
//     try {
//         const docRef = doc(db, blogsCollection, id);
//         const docSnapshot = await getDoc(docRef);
//         return docSnapshot ? docSnapshot.data(): null;    
//     }
//     catch(err){
//         console.error(err.message);
//         return null;
//     }
// }

// // Adds/updates a blog to the blogs collection
// // Adds/updates a blog to the blogs collection
// export const saveBlog = async function(blog) {
//     try {
//       let docRef;
//       if (blog.id) {
//         docRef = doc(db, `${blogsCollection}/${blog.id}`);
//         await setDoc(docRef, blog);
//       } else {
//         docRef = await addDoc(collection(db, blogsCollection), blog);
//         blog.id = docRef.id; // Assign the generated ID to the blog object
//         await updateDoc(docRef, blog); // Update the document with the assigned ID
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

// // Deletes a blog from the blogs collection
// export const deletePerson = async function(blog){
//     try {
//         const docRef = doc(db, blogsCollection, blog.id);
//         await deleteDoc(docRef);
//     }
//     catch(err){
//         console.error(err.message);
//     }
// }