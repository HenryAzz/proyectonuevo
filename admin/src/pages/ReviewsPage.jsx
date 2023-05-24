import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Stack, Typography } from "@mui/material";
// components
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from "../sections/@dashboard/blog";
// mock
import POSTS from "../_mock/blog";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Mas nuevo" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Mas antiguo" },
];

// ----------------------------------------------------------------------

export default function ReviewsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Reviews | PropTech </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}></Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Reseñas
          </Typography>
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
