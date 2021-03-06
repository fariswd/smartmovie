const genre = [{
  "id": 10759,
  "name": "Action & Adventure"
},
{
  "id": 16,
  "name": "Animation"
},
{
  "id": 35,
  "name": "Comedy"
},
{
  "id": 80,
  "name": "Crime"
},
{
  "id": 99,
  "name": "Documentary"
},
{
  "id": 18,
  "name": "Drama"
},
{
  "id": 10751,
  "name": "Family"
},
{
  "id": 10762,
  "name": "Kids"
},
{
  "id": 9648,
  "name": "Mystery"
},
{
  "id": 10763,
  "name": "News"
},
{
  "id": 10764,
  "name": "Reality"
},
{
  "id": 10765,
  "name": "Sci-Fi & Fantasy"
},
{
  "id": 10766,
  "name": "Soap"
},
{
  "id": 10767,
  "name": "Talk"
},
{
  "id": 10768,
  "name": "War & Politics"
},
{
  "id": 37,
  "name": "Western"
}]

function findGenre(id:Number) {
  const filtered = genre.filter(g => g.id == id)
  if(filtered.length>0){
    return filtered[0].name
  } else {
    return ''
  }
}

export default findGenre