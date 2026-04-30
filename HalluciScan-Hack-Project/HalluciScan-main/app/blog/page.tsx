import Link from 'next/link';
import Navbar from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../lib/mockData';

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="blog-page section">
        <div className="container">
          <div className="page-header text-center">
            <h1>Research Blog</h1>
            <p>
              Stay updated with the latest insights on AI hallucination detection,
              research findings, and industry developments.
            </p>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card card">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-author">By {post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="btn btn-secondary">
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}