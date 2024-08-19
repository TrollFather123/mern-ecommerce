import { useDispatch } from "react-redux";
import BannerSec from "../components/BannerSec/BannerSec";
import CategoryProductSection from "../components/CategoryProductSection/CategoryProductSection";
import EachCategorySection from "../components/EachCategorySection/EachCategorySection";
import { useEffect, useState } from "react";
import { getAllCategories } from "../redux/slice/productSlice";

const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllCategories()).unwrap().then((res) =>{
      if(res?.data){
        setCategoryList(res?.data)
      }
    })
  },[])
  return (
    <>
      <CategoryProductSection />
      <BannerSec/>
      {
        !!categoryList && categoryList?.length && categoryList.map((eachCategory)=>(
          <EachCategorySection categoryName={eachCategory} key={eachCategory}/>
        ))
      }
 
    </>
  );
};

export default Home;
