import ShowBlogs from './components/ShowBlogs.vue'
import AddBlog from './components/AddBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EditBlog.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
export default[
	{path:"/",component:ShowBlogs},
	{path:"/add",component:AddBlog},
	{path:"/blog/:id",component:SingleBlog},
	{path:"/edit/:id",component:EditBlog},
	{path:"/login",component:Login},
	{path:"/register",component:Register},
]