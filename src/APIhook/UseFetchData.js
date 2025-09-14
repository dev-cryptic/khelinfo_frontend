// import { useState, useEffect } from "react";

// const UseFetchData = (url, interval = 10000) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true; // Prevent memory leaks in unmounted components

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const result = await response.json();
//         if (isMounted) setData(result);
//       } catch (err) {
//         if (isMounted) setError(err.message);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchData(); // Initial call
//     const intervalId = setInterval(fetchData, interval);

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId); // Cleanup interval on component unmount
//     };
//   }, [url, interval]);

//   return { data, loading, error };
// };

// export default UseFetchData;
