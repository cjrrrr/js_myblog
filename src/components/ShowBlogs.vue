<template>
  <div style="display: flex;">
		<div v-theme:column="'wide'" id="show-blogs">
			<h1>博客总览</h1>
			<input type="text" v-model="search" placeholder="搜索">
			<div v-for="blog in filteredBlogs" class="single-blog">
				<router-link v-bind:to="'/blog/' + blog.id">
					<h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
				</router-link>
				<article>
					{{blog.content | snippet}}
				</article>
			</div>
		</div>
		<div class="canlendar">
			<el-calendar v-model="value">
			</el-calendar>
		</div>
	<div>
		
	</div>
  </div>
</template>

<script>

export default {
  name: 'show-blogs',
  data() {
  	return {
		blogs:[],
		search:""
  	}
  },
  created() {
  	this.$http.get("https://myblog-41a2d.firebaseio.com/posts.json")
	.then(function(data){
		
		// console.log(data.json());
		return data.json()
	})
		.then(function(data){
			var blogsArray = [];
			for(let key in data){
				//console.log(data[key]);
				data[key].id=key;
				blogsArray.push(data[key]);
			}
			this.blogs=blogsArray;
			console.log(this.blogs);
		})
		//this.blogs = data.body.slice(0,10);
		//console.log(this.blogs);
  },
  //搜索
  computed:{
	  filteredBlogs:function(){
		  return this.blogs.filter((blog) =>{
			  return blog.title.match(this.search);
		  })
	  }
  },
  filters:{
	  "to-uppercase":function(value){
		  return value.toUpperCase();
	  }
  },
}
</script>

<style>
#show-blogs{
	width: 70%;
	margin: 0 auto;
}

.canlendar{
	width: 20%;
	
	border: rgb(102, 119, 204) 1px solid;
	background-color: rgb(102, 119, 204);
}

.single-blog{
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background: #eee;
	border: 1px dotted #aaa;
}

#show-blogs a{
	color: #444;
	text-decoration: none;
}

input[type="text"]{
	padding: 8px;
	width: 100%;
	box-sizing: border-box;
}
</style>
