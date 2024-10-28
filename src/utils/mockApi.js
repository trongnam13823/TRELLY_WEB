// Access key từ tài khoản Unsplash
import shuffleArray from "@/utils/shuffleArray";
const UNSPLASH_ACCESS_KEY = 'lsinpQf9h6edSlsC0LctBcdGv7G8bi4pQgW4_B08eVU' 
const NUMBER_OF_IMAGES = 30
const NUMBER_OF_CARDS = 10
const NUMBER_OF_COLUMNS = 3

// Hàm gọi API Unsplash để lấy danh sách ảnh ngẫu nhiên
const fetchRandomUnsplashImages = async (count) => {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=${count}&h=160`)
  if (!response.ok) {
    throw new Error('Failed to fetch images from Unsplash')
  }
  return response.json()
}

// Lấy ảnh ngẫu nhiên từ danh sách ảnh đã gọi từ API Unsplash
const getRandomUnsplashImage = (images) => {
  return images[Math.floor(Math.random() * images.length)]
}

// Hàm tạo dữ liệu card ngẫu nhiên
const generateRandomCards = (columnId, boardId, images, numOfCards = NUMBER_OF_CARDS) => {
  const numCards = Math.floor(Math.random() * numOfCards)
  const cards = []

  for (let i = 0; i < numCards; i++) {
    const hasImage = Math.random() > 0.5 // 50% khả năng có ảnh
    const randomImage = getRandomUnsplashImage(images)
    const imageUrl = randomImage.urls.small.split('?')[0] + `?h=${Math.floor(Math.random() * 320) + 60}`

    const card = {
      _id: `card-id-${columnId}-${i + 1}`,
      boardId: boardId,
      columnId: columnId,
      title: randomImage.alt_description || 'Untitled', // Sử dụng mô tả của ảnh
      description: hasImage
        ? `This card contains an image about ${randomImage.alt_description}.`
        : `This card does not contain an image but is about ${randomImage.alt_description}.`,
      cover: hasImage ? imageUrl : null, // Có thể có hoặc không có ảnh
      memberIds:
        Math.random() < 0.5 ? Array.from({ length: Math.floor(Math.random() * 100) }, (_, idx) => `member-id-${idx + 1}`) : [],
      comments:
        Math.random() < 0.5
          ? Array.from({ length: Math.floor(Math.random() * 100) }, (_, idx) => ({
              id: `comment-id-${idx + 1}`,
              content: `Comment content ${idx + 1}`,
            }))
          : [],
      attachments:
        Math.random() < 0.5
          ? Array.from({ length: Math.floor(Math.random() * 100) }, (_, idx) => ({
              id: `attachment-id-${idx + 1}`,
              title: `Attachment ${idx + 1}`,
            }))
          : [],
    }
    cards.push(card)
  }

  return cards
}

// Hàm tạo dữ liệu column ngẫu nhiên
const generateRandomColumns = (
  numColumns,
  boardId,
  images,
  numOfCards = NUMBER_OF_CARDS
) => {
  const columns = []
  let columnOrderIds = []

  for (let i = 0; i < numColumns; i++) {
    const columnId = `column-id-${i + 1}`
    columnOrderIds.push(columnId)

    const column = {
      _id: columnId,
      boardId: boardId,
      title: `Column ${i + 1}`,
      cardOrderIds: [],
      cards: generateRandomCards(columnId, boardId, images, numOfCards),
    }

    // Lưu trữ thứ tự sắp xếp của các card
    column.cardOrderIds = shuffleArray(column.cards.map((card) => card._id))

    columns.push(column)
  }

  columnOrderIds = shuffleArray(columnOrderIds)

  return { columns, columnOrderIds }
}

// Hàm tạo dữ liệu mock từ API Unsplash
export const getBoard = async (
  numberOfColumns = NUMBER_OF_COLUMNS,
  numberOfCards = NUMBER_OF_CARDS,
  numberOfImages = NUMBER_OF_IMAGES
) => {
  try {
    if (localStorage.getItem('boardData') === null) {
      // Lấy 30 ảnh từ API Unsplash
      const unsplashImages = await fetchRandomUnsplashImages(numberOfImages)

      // Tạo dữ liệu board
      const boardData = {
        _id: 'board-id-01',
        title: 'Nam Dep Trai',
        description: 'Pro MERN stack Course',
        ownerIds: [],
        memberIds: [],
        ...generateRandomColumns(numberOfColumns, 'board-id-01', unsplashImages, numberOfCards),
      }

      // Lưu trữ dữ liệu board vào localStorage
      localStorage.setItem('boardData', JSON.stringify(boardData))
      return boardData
    } else {
      return new Promise((resolve) => {
        resolve(JSON.parse(localStorage.getItem('boardData')))
      })
    }
  } catch (error) {
    throw new Error(error)
  }
}
