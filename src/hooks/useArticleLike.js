import { useState } from 'react'

import { useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/api'

// import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'

const useArticleLike = (initialFavorited, initialFavoritesCount, slug) => {
  const [isLiked, setIsLiked] = useState(initialFavorited)
  const [countOfLikes, setCountOfLikes] = useState(initialFavoritesCount)
  const token = localStorage.getItem('token')

  const [likeArticle] = useLikeArticleMutation()
  const [unlikeArticle] = useUnlikeArticleMutation()

  const toggleLike = async () => {
    if (!isLiked) {
      try {
        await likeArticle({ token, slug })
        setIsLiked(true)
        setCountOfLikes((prevState) => prevState + 1)
      } catch (err) {
        console.error(`Не могу поставить лайк... ${err}`)
      }
    } else {
      try {
        await unlikeArticle({ token, slug })
        setIsLiked(false)
        setCountOfLikes((prevState) => prevState - 1)
      } catch (err) {
        console.error(`Не могу убрать лайк... ${err}`)
      }
    }
  }

  return { isLiked, countOfLikes, toggleLike }
}

export default useArticleLike

// // import { useState } from 'react'

// // import { useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/api'

// // // import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'

// // const useArticleLike = (initialIsLiked, initialCountOfLikes, slug) => {
// //   const [isLiked, setIsLiked] = useState(initialIsLiked)
// //   const [countOfLikes, setCountOfLikes] = useState(initialCountOfLikes)
// //   const token = localStorage.getItem('token')

// //   const [likeArticle] = useLikeArticleMutation()
// //   const [unlikeArticle] = useUnlikeArticleMutation()

// //   const toggleLike = async () => {
// //     if (!isLiked) {
// //       setIsLiked(true)
// //       setCountOfLikes((prevState) => prevState + 1)
// //       try {
// //         await likeArticle({ token, slug })
// //         console.log('получилось поставить лайк')
// //       } catch (err) {
// //         console.error(`Не могу поставить лайк... ${err}`)
// //       }
// //     } else {
// //       setIsLiked(false)
// //       setCountOfLikes((prevState) => prevState - 1)
// //       try {
// //         await unlikeArticle({ token, slug })
// //         console.log('получилось убрать лайк')
// //       } catch (err) {
// //         console.error(`Не могу убрать лайк... ${err}`)
// //       }
// //     }
// //   }

// //   return {
// //     isLiked,
// //     countOfLikes,
// //     toggleLike,
// //     setCountOfLikes, // Expose setter for updating likes count when data is loaded
// //   }
// // }

// // export default useArticleLike

// import { useState } from 'react'

// import { useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/api'

// // import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'

// const useArticleLike = (initialIsLiked, initialCountOfLikes, slug) => {
//   const [isLiked, setIsLiked] = useState(initialIsLiked)
//   const [countOfLikes, setCountOfLikes] = useState(initialCountOfLikes)
//   const token = localStorage.getItem('token')

//   const [likeArticle] = useLikeArticleMutation()
//   const [unlikeArticle] = useUnlikeArticleMutation()

//   const toggleLike = async () => {
//     if (!isLiked) {
//       setIsLiked(true)
//       setCountOfLikes((prevState) => prevState + 1)
//       try {
//         await likeArticle({ token, slug })
//         console.log('получилось поставить лайк')
//       } catch (err) {
//         console.error(`Не могу поставить лайк... ${err}`)
//       }
//     } else {
//       setIsLiked(false)
//       setCountOfLikes((prevState) => prevState - 1)
//       try {
//         await unlikeArticle({ token, slug })
//         console.log('получилось убрать лайк')
//       } catch (err) {
//         console.error(`Не могу убрать лайк... ${err}`)
//       }
//     }
//   }

//   const setInitialState = () => {
//     setIsLiked(initialIsLiked)
//     setCountOfLikes(initialCountOfLikes)
//   }

//   return {
//     isLiked,
//     countOfLikes,
//     toggleLike,
//     setInitialState, // Expose setter for updating likes count when data is loaded
//   }
// }

// export default useArticleLike

// import { useDispatch, useSelector } from 'react-redux'

// // import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'
// import { setLikes, toggleLike } from '../redux/likesSlice'
// import { useLikeArticleMutation, useUnlikeArticleMutation } from '../redux/api'

// // import { useDispatch, useSelector } from 'react-redux'
// // import { useLikeArticleMutation, useUnlikeArticleMutation } from '../../redux/api'
// // import { setLikes, toggleLike } from '../../redux/likesSlice'

// const useArticleLike = (slug) => {
//   const dispatch = useDispatch()
//   const likesState = useSelector((state) => state.likes[slug]) || {
//     isLiked: false,
//     countOfLikes: 0,
//   }
//   const token = localStorage.getItem('token')

//   const [likeArticle] = useLikeArticleMutation()
//   const [unlikeArticle] = useUnlikeArticleMutation()

//   const toggleLikeAction = async () => {
//     dispatch(toggleLike({ slug }))
//     if (likesState.isLiked) {
//       try {
//         await unlikeArticle({ token, slug })
//         console.log('получилось убрать лайк')
//       } catch (err) {
//         console.error(`Не могу убрать лайк... ${err}`)
//       }
//     } else {
//       try {
//         await likeArticle({ token, slug })
//         console.log('получилось поставить лайк')
//       } catch (err) {
//         console.error(`Не могу поставить лайк... ${err}`)
//       }
//     }
//   }

//   const setInitialState = (isLiked, countOfLikes) => {
//     dispatch(setLikes({ slug, isLiked, countOfLikes }))
//   }

//   return {
//     isLiked: likesState.isLiked,
//     countOfLikes: likesState.countOfLikes,
//     toggleLike: toggleLikeAction,
//     setInitialState,
//   }
// }

// export default useArticleLike

// const useArticleLike = (slug) => {
//   const dispatch = useDispatch()
//   const likesState = useSelector((state) => state.likes[slug])
//   const token = localStorage.getItem('token')

//   const [likeArticle] = useLikeArticleMutation()
//   const [unlikeArticle] = useUnlikeArticleMutation()

//   const toggleLikeAction = async () => {
//     dispatch(toggleLike({ slug }))
//     if (likesState.isLiked) {
//       try {
//         await unlikeArticle({ token, slug })
//         console.log('получилось убрать лайк')
//       } catch (err) {
//         console.error(`Не могу убрать лайк... ${err}`)
//       }
//     } else {
//       try {
//         await likeArticle({ token, slug })
//         console.log('получилось поставить лайк')
//       } catch (err) {
//         console.error(`Не могу поставить лайк... ${err}`)
//       }
//     }
//   }

//   const setInitialState = (isLiked, countOfLikes) => {
//     dispatch(setLikes({ slug, isLiked, countOfLikes }))
//   }

//   return {
//     isLiked: likesState?.isLiked ?? false,
//     countOfLikes: likesState?.countOfLikes ?? 0,
//     toggleLike: toggleLikeAction,
//     setInitialState,
//   }
// }

// export default useArticleLike
