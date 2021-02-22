
const UserLinks = [
  {
    name: "My Cart",
    path: "/user/mycart",
  },
  {
    name: "Whislist",
    path: "/user/whislist",
  },
  {
    name: "My Account",
    path: "/user/myaccount",
  },
  {
    name: "My Orders",
    path: "/user/myorders",
  },
];

const AdminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Orders",
    path: "/admin/orders",
  },
  {
    name: "Category",
    path: "/admin/category",
  },{
    name:"Sub Category",
    path:"/admin/subcategory"
  },
  {
    name: "Create Product",
    path: "/admin/create-product",
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
  },
];

function Sidebar(state = null, action) {
   
  switch (action.type) {
    case "LOGINAS_USER":
      return UserLinks ;
    case "LOGINAS_ADMIN":
      return AdminLinks;
    default:
      return state;
  }
}

export default Sidebar;
