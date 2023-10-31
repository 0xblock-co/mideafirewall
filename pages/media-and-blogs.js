import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import NextImageComponent from "@/components/NextImageComponent";
import CustomPagination from "@/components/Pagination";
import Api from "@/services/RTK/axiosAPI.handler";

export default function Blogs() {
  // Constants
  const router = useRouter();
  const api = new Api();

  // const { setHeaderDataFromServerSide } = useHeaderContext();

  // States
  const [blogsDetails, setBlogsDetails] = useState({ items: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Memoized getBlogs function
  const getBlogs = useCallback(async (pageNumber = 0, pageSize = 10) => {
    const response = await api.get(
      `https://drivesafe360.themillionvisions.com/driveSafe/blogsPosts/?active=true&descend=true&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (response.isSuccess) {
      const thirdArray = response?.data?.items?.filter((elem) => {
        return !blogsDetails?.items?.items?.some((ele) => {
          return ele?.id === elem?.id;
        });
      });
      setBlogsDetails({
        items: thirdArray,
        pageInfo: response?.data?.pageInfo,
      });
    }
  }, []);

  // Effect to initialize Aos and get blogs on mount

  useEffect(() => {
    getBlogs(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // Handlers
  function handlePageChange(page) {
    setCurrentPage(page);
    getBlogs(page, pageSize);
  }

  // Memoized latest blog
  const latestBlog = blogsDetails?.items[0];

  return (
    <main>
      <section
        className="blog-first-section"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Container className="justify-content-center">
          <Row>
            <Col lg={7}>
              <div className="blog-content">
                <span>FEATURED ARTICLE</span>
                <h1>{latestBlog?.title}</h1>
                <p>{latestBlog?.content}</p>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-2 py-3 common-btn"
                  onClick={() => router.push(`/blogdetail/${latestBlog?.id}`)}
                >
                  Read Article
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <div className="blog-img">
                <NextImageComponent
                  url={latestBlog?.imageUrl || "/images/logo.png"}
                  isOriginalCheck={true}
                  imageQuality={50}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        className="two-block-section"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Container>
          <Row>
            <Col lg={12}>
              <div className="two-block-title">
                <h2>Recent Posts</h2>
              </div>
            </Col>
          </Row>
          <Row>
            {blogsDetails?.items?.map((item, index) => (
              <Col lg={4} key={index}>
                <div
                  className="recent-blog-main"
                  onClick={() => router.push(`/blogdetail/${item?.id}`)}
                >
                  <div className="recent-blog-img">
                    <NextImageComponent
                      url={item?.imageUrl || "publicimages/logo.png"}
                      isOriginalCheck={true}
                      imageQuality={50}
                    />
                  </div>
                  <div className="recent-blog-content">
                    <span>
                      Write By <a href="#">{item?.author}</a>
                    </span>
                    <h3>{item?.title}</h3>
                    <p>{item?.content}</p>
                    <ul>
                      <li>
                        <span>
                          {moment(item?.publicationDate).format("MMMM d, YYYY")}
                        </span>
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
            ))}
          </Row>
          <CustomPagination
            isFirst={blogsDetails?.pageInfo?.first}
            isLast={blogsDetails?.pageInfo?.last}
            currentPage={currentPage == 0 ? currentPage + 1 : currentPage}
            totalPages={blogsDetails?.pageInfo?.totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      </section>
    </main>
  );
}
