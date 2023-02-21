import { useQuery } from '@tanstack/react-query';
import React,{useState,useEffect} from 'react';
import ProductCard from './ProductCard';
import NoResult from '../pages/NoResult';
import styled from "styled-components";
import { LoadProductsAll } from '../api/api';
import axios from 'axios'

const baseURL = process.env.REACT_APP_URL

const CategoriesContainer = styled.div`
    height : 80px;
    width : 100%;
    padding : 15px 20px 10px 20px;
    position : relative;
    display: flex;
    align-items: center;
`
const Category = styled.h2`
    color : black;
    float: left;
    font-size: 20px;
    margin-right: 30px;
    &:hover{
        color : #666666e0;
        cursor : pointer;
    }
`
const SearchContainer = styled.div`
  width : 30%;
  height : 80px;
  margin-left: auto;
  margin-right : 20px;
  display: flex;
  align-items: center;
`
const SearchInput = styled.input`
  width : 70%;
  height : 30%;
  margin-right: 5px;
  border-radius: 15px;
  border : 1px solid grey;
  align-self: right;
`
const SearchBtn = styled.button`
  width : 30%;
  height : 30px;
  background-color : black;
  color : white;
  align-self: center;
  border-radius: 15px;
  font-family: "RalewayBold";
`
const SortLabel = styled.label`
  font-size : 15px;
  font-family: "RalewayBold";
  margin-right: 20px;
  &:hover{
        color : #666666e0;
        cursor : pointer;
  }
`
const SortContainer = styled.div`
  padding : 40px 20px 10px 50px;
  display: flex;
  align-content: flex-start;
`
// const Sort = ({sortHandler}) =>(
//   <SortContainer>
//     <SortLabel onClick={sortHandler}>HITS</SortLabel>
//     <SortLabel onClick={sortHandler}>NEWEST</SortLabel>
//     <SortLabel onClick={sortHandler}>LIKE</SortLabel>
//     <SortLabel onClick={sortHandler}>PURCHASE</SortLabel>
//   </SortContainer>
// )
const Search = ({keywordHandler,searchHandler}) =>(
  <SearchContainer>
    <SearchInput onChange={keywordHandler}></SearchInput>
    <SearchBtn onClick = {searchHandler}>SEARCH</SearchBtn>
  </SearchContainer>
)
// const categoryClickHandler = (event) => {
//   setUserAddress(event.currentTarget.value);
// }

export default function Products() {
    const [isResult,setIsResult] = useState(true);
    const [category,setCategory] = useState("all");
    const [keyword,setKeyword] = useState("");
    const [products, setProducts] = useState();
    const [sort,setSort] = useState("hits");
    useEffect(() => {
      if(category==="all"){
        axios({
          method: "get",
          url: baseURL + "/shop",
          headers: {
            "Content-Type": "application/json",
          }
        }).then((response) => {
          setProducts(response.data);
        })
          .catch((error) => {
            console.log(error);
          })
      }else{
        axios({
          method: "get",
          url: `${baseURL}/shop/category/${category}?sort=${sort}`,
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          setIsResult(true);
          setProducts(response.data)
          console.log(`Sorted : ${sort}\nCategory : ${category}`)
        }).catch((error) => {
          setIsResult(false);
          console.log(error);
        })
      }
    }, [category,sort,isResult])
  const onCategoryClick = (props) => {
    setCategory(props);
  }
  const onSortClick =(props)=>{
    setSort(props);
  }
  const onKeywordChangeHandeler = (event) => {
    const currentKeyword = event.currentTarget.value;
    setKeyword(currentKeyword);
  }
  const onSearchHandeler = (event) => {
    event.preventDefault();
    console.log(keyword);

    axios({
      method: "get",
      url: `${baseURL}/shop/search/${keyword}?sort=${sort}`,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      setIsResult(true);
      setProducts(response.data)
    }).catch((error) => {
      setIsResult(false);
      console.log(error);
    })
  }
  
    return (
      <>
        <CategoriesContainer>
          <Category onClick={() => onCategoryClick("all")}>ALL</Category>
          <Category onClick={() => onCategoryClick("shirts")}>SHIRTS</Category>
          <Category onClick={() => onCategoryClick("outer")}>OUTER</Category>
          <Category onClick={() => onCategoryClick("pants")}>PANTS</Category>
          <Category onClick={() => onCategoryClick("shoes")}>SHOES</Category>
        <Search
          keywordHandler={onKeywordChangeHandeler}
            searchHandler= {onSearchHandeler}/>
        </CategoriesContainer>
        <SortContainer>
          <SortLabel onClick={() => onSortClick("hits")}>HITS</SortLabel>
          <SortLabel onClick={() => onSortClick("date")}>NEWEST</SortLabel>
          <SortLabel onClick={() => onSortClick("favorite")}>LIKE</SortLabel>
          <SortLabel onClick={() => onSortClick("purchase")}>PURCHASE</SortLabel>
        </SortContainer>
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
        <div className='p-10 pt-4'>
          {isResult&&
            <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
            {products &&
              products.map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))
            }
          </ul>
          }
          {!isResult&&<NoResult></NoResult>}
        </div>
      </>
    );
  }
  