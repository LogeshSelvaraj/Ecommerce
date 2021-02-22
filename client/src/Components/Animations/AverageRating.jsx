import React from 'react'
import StarRatings from "react-star-ratings"

const AverageRating = ({ratings}) => {

    if(ratings&&ratings.length){
        let total=0;
        const highest=ratings.length
        highest&&ratings.map(r=>total=total+r.star)
        const average=total/highest

        return (
            <>
            <StarRatings
                rating={average }
                numberOfStars={5}
                starRatedColor="green"
                starHoverColor="green"
                starDimension="20px"
                starSpacing="3px"
              />
              <span style={{fontSize:"16px"}}>({highest})</span>
              </>
        )
    }else{
        return <span></span>
    }
}

export default AverageRating
