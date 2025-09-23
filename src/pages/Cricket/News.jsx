import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetches 20 articles by adding the size parameter
        const response = await axios.get('https://api.webz.io/newsApiLite?token=33bef10f-7f07-432b-a694-320d8b17ba67&q=sports&size=20');
        
        if (response.data.posts && response.data.posts.length > 0) {
          const blogData = response.data.posts.map(post => ({
            url: post.url,
            image: post.thread?.main_image, // Safely access nested image
            title: post.title,
            description: post.text,
          }));
          setBlogs(blogData);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="py-10 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          Latest News
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No news available at the moment.
            </p>
          ) : (
            blogs.map((blog, index) => (
              <a
                key={index}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-black"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title || "Blog Thumbnail"}
                    className="w-full h-40 object-cover rounded-t-2xl"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found'; }}
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {blog.title
                      ? blog.title.length > 80
                        ? blog.title.slice(0, 77) + "..."
                        : blog.title
                      : "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {blog.description
                      ? blog.description.length > 100
                        ? blog.description.slice(0, 97) + "..."
                        : blog.description
                      : "No description available."}
                  </p>
                </div>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default News;