<template>
  <div id="app">
		<!-- <add-blog></add-blog> -->
		<!-- <ShowBlogs></ShowBlogs> -->
		<blog-header></blog-header>
		<router-view></router-view>
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'
import Login from'./components/Login'

export default {
  name: 'App',
  components: {
    AddBlog,ShowBlogs,BlogHeader,Login
  }
}
</script>

<style>

</style>
