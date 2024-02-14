/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";
import Api from "@/services/RTK/axiosAPI.handler";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
const api = new Api();
const baseApi = process.env.NEXT_PUBLIC_API_PATH_V2;

export default function DocumentationAndBlogs() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [blogsDetails, setBlogsDetails] = useState({ items: [] });
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    const getBlogs = useCallback(
        async (pageNumber = 0, pageSize = 10) => {
            try {
                setIsLoading(true);
                const url = `${baseApi}/mfw/web/content/type/BLOG?pageNumber=${pageNumber}&pageSize=${pageSize}`;
                const response = await api.get(url, {}, true, false);

                if (response.isSuccess) {
                    setIsLoading(false);
                    const newBlogs = response.data.content.filter((elem) => {
                        return !blogsDetails.items.some((ele) => ele.id === elem.id);
                    });

                    setBlogsDetails({
                        items: newBlogs,
                        pageInfo: {
                            totalPages: response.data?.totalPages,
                            numberOfElements: response.data?.numberOfElements,
                            last: response.data?.last,
                            first: response.data?.first,
                            numberOfElements: response.data?.numberOfElements,
                            totalElements: response.data?.totalElements,
                            ...response.data.pageable,
                        },
                    });
                }
            } catch (error) {
                // Handle the error
                setIsLoading(false);
            }
        },
        [blogsDetails]
    );

    useEffect(() => {
        getBlogs(currentPage, pageSize);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getBlogs(page, pageSize);
    };

    const latestBlog = blogsDetails.items[0];

    return (
        <main>
            <section className="blog-first-section" data-aos="fade-up" data-aos-delay="100">
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
                                    // onClick={() => router.push(`/blogdetail/${latestBlog?.id}`)}
                                >
                                    Read Article
                                </Button>
                            </div>
                        </Col>
                        <Col lg={5}>
                            <div className="blog-img">
                                <iframe
                                    loading="lazy"
                                    width="100%"
                                    height={"100%"}
                                    style={{ borderRadius: "43px" }}
                                    src={latestBlog?.mediaUrl}
                                    frameBorder="0"
                                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    poster={latestBlog?.thumbnailUrl}
                                />
                                {/* <ResponsiveImage url={latestBlog?.thumbnailUrl} alt="Documentation & Blogs" altUrlType="Documentation & Blogs" imageQuality={75} /> */}
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
                                <h2>Recent Posts</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {blogsDetails.items.map((item, index) => (
                            <Col lg={4} key={index}>
                                <div
                                    className="recent-blog-main"
                                    // onClick={() => router.push(`/blogdetail/${item.id}`)}
                                >
                                    <div className="recent-blog-img">
                                        <iframe
                                            key={index}
                                            loading="lazy"
                                            width="100%"
                                            height={"320"}
                                            style={{ borderRadius: "18px" }}
                                            src={item.mediaUrl}
                                            frameBorder="0"
                                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            poster={item.thumbnailUrl}
                                        />
                                        {/* <ResponsiveImage url={item.thumbnailUrl} alt="Documentation & Blogs" altUrlType="Documentation & Blogs" imageQuality={75} /> */}
                                    </div>
                                    <div className="recent-blog-content">
                                        <span>
                                            Write By <a href="#">{item.author}</a>
                                        </span>
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                        <ul>
                                            <li>
                                                <span>{moment(item.publicationDate).format("MMMM D, YYYY")}</span>
                                            </li>
                                            <li>
                                                <span>{item.likes} like</span>
                                            </li>
                                            <li>
                                                <span>{item.socialMediaShareCount} share</span>
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
                        currentPage={currentPage + 1}
                        totalPages={blogsDetails?.pageInfo?.totalPages}
                        onPageChange={handlePageChange}
                    />
                </Container>
            </section>
            <Loader isLoading={isLoading} />
        </main>
    );
}
