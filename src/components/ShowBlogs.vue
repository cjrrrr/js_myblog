<template>	
  <div class="box1">
		  <vue-particles
				style="position: absolute;width: 100%;height: 100%;"
		    color="#dedede"
		    :particleOpacity="0.7"
		    :particlesNumber="80"
		    shapeType="circle"
		    :particleSize="4"
		    linesColor="#dedede"
		    :linesWidth="1"
		    :lineLinked="true"
		    :lineOpacity="0.4"
		    :linesDistance="150"
		    :moveSpeed="3"
		    :hoverEffect="true"
		    hoverMode="grab"
		    :clickEffect="true"
		    clickMode="push"
		  >
		  </vue-particles>

		<div style="width: 100%;">
			<el-carousel indicator-position="outside" height="250px">
				<el-carousel-item v-for="img in imgList" :key="img.id">
					<img :src="img.url" alt="">
				</el-carousel-item>
			</el-carousel>
		</div>
		
		<div class="box2">
			<el-card style="width: 20%;height: 700px;overflow: auto;">
				<el-image v-for="url in urls" :key="url" :src="url" :lazy="true"></el-image>
			</el-card>
			<el-card v-theme:column="'wide'" id="show-blogs">
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
			</el-card>
			<el-card class="canlendar">
				<el-calendar>
				</el-calendar>
			</el-card>
		</div>
  </div>
</template>

<script>

export default {
  name: 'show-blogs',
  data() {
  	return {
		blogs:[],
		search:"",
		urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
		imgList: [
					{id:0,url:require('../assets/images/banner1.jpg')},
					{id:1,url:require('../assets/images/banner2.jpeg')},
					{id:2,url:require('../assets/images/banner3.jpeg')}
		]
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
.box1{
	display: flex;
	flex-direction: column;	 
}

.box2{
	display: flex;
	flex-direction: row;
}
	
#img{
	width: 20%;
}	

#show-blogs{ 
	width: 60%;
	margin: 0 auto;
}

.canlendar{
	width: 20%;
	max-height: 700px;
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
//走马灯
.el-carousel__item img{
    opacity: 0.75;
    margin: 0;
  }
</style>
