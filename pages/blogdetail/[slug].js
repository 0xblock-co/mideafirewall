/* eslint-disable no-unsafe-optional-chaining */
import ResponsiveImage from "@/components/NextImageComponent/ResponsiveImage";
import Api from "@/services/RTK/axiosAPI.handler";
import moment from "moment";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const api = new Api();

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  //states
  const [blogsDetails, setBlogsDetails] = useState({ items: [] });

  //hooks
  useEffect(() => {

    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getBlogs(pageNumber = 0, pageSize = 10) {
    const params = {
      active: true,
      descend: true,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const response = await api.get(`https://drivesafe360.millionvisions.ai/driveSafe/blogsPosts/`, params, true, false);
    if (response.isSuccess) {
      const items = response?.data?.items?.filter(
        (mainItem) =>
          !blogsDetails?.items?.find((item) => mainItem?.id === item.id)
      );
      // eslint-disable-next-line no-unsafe-optional-chaining
      setBlogsDetails((prevData) => ({
        items: [...prevData?.items, ...items],
        pageInfo: response?.data?.pageInfo,
      }));
    }
  }

  // console.log("slug>", slug);
  // const id = blogsDetails?.items?.find((item) => item?.title === slug);
  const id = slug;

  const selectedBlog = blogsDetails?.items?.find((item) => item?.id == id);
  const recentBlogs = blogsDetails?.items?.filter((item) => item?.id !== id);

  return (
      <>
          <main>
              <NextSeo title="BlogDetail" />
              <section className="blog-first-section">
                  <Container>
                      <Row>
                          <Col lg={8}>
                              <Col lg={12}>
                                  <div className="blog-detail-text">
                                      <h1>{selectedBlog?.title}</h1>
                                  </div>
                              </Col>
                              <Col lg={12}>
                                  <div className="blog-img blog-detail-img-block ">
                                      <ResponsiveImage url={selectedBlog?.imageUrl} altUrlType={""} isOriginalCheck={true} imageQuality={50} />
                                  </div>
                              </Col>
                              <Col lg={12}>
                                  <div className="blog-details-contents">
                                      <ul>
                                          <li>
                                              <span>{moment(selectedBlog?.publicationDate).format("MMMM d, YYYY")}</span>
                                          </li>
                                          <li>
                                              <span>{selectedBlog?.likes} Likes</span>
                                          </li>
                                          <li>
                                              <span>{selectedBlog?.socialMediaShareCount} Shares</span>
                                          </li>
                                          <li>
                                              By{" "}
                                              <a href="#" title="by">
                                                  {selectedBlog?.author}
                                              </a>
                                          </li>
                                          <li>
                                              tags:{" "}
                                              {selectedBlog?.tags?.map((item, index, row) => {
                                                  return <span key={index}>{index + 1 === row.length ? item : item + ", "}</span>;
                                              })}
                                          </li>
                                      </ul>
                                  </div>
                                  <div className="blog-detail-text">
                                      <p>{selectedBlog?.content}</p>
                                  </div>
                              </Col>
                          </Col>
                          <Col lg={4}>
                              <div className="recent-blogs-block">
                                  <h3>Recent Blogs</h3>
                                  <ul>
                                      {recentBlogs?.map((item) => {
                                          return (
                                              <li key={item?.id}>
                                                  <Link href={`/blogdetail/${item?.id}`} title="blog-detail">
                                                      {item?.title}
                                                  </Link>
                                              </li>
                                          );
                                      })}
                                  </ul>
                              </div>
                          </Col>
                      </Row>
                  </Container>
              </section>
              <section className="two-block-section" data-aos="fade-up" data-aos-delay="100">
                  <Container>
                      <Row>
                          <Col lg={12}>
                              <div className="two-block-title">
                                  <h2>Similar Posts</h2>
                              </div>
                          </Col>
                      </Row>
                      <Row>
                          {blogsDetails?.items?.slice(0, 3).map((item, index) => {
                              return (
                                  <Col lg={4} key={index} onClick={() => router.push(`/blogdetail/${item.id}`)}>
                                      <div className="recent-blog-main">
                                          <div className="recent-blog-img">
                                              <ResponsiveImage url={item?.imageUrl} altUrlType={""} isOriginalCheck={true} imageQuality={50} />
                                          </div>
                                          <div className="recent-blog-content">
                                              <h3>{item?.title}</h3>
                                              <p>{item?.content}</p>
                                              <ul>
                                                  <li>
                                                      <span>{moment(selectedBlog?.publicationDate).format("MMMM d, YYYY")}</span>
                                                  </li>
                                                  <li>
                                                      <span>{item?.likes} like</span>
                                                  </li>
                                                  <li>
                                                      <span>{item?.socialMediaShareCount} share</span>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </Col>
                              );
                          })}
                      </Row>
                  </Container>
              </section>
          </main>
      </>
  );
}
