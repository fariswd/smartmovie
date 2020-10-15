import React from 'react'
import {create, act} from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'

import MovieScreen from '../src/screens/MovieScreen'
import TvScreen from '../src/screens/TvScreen'
import HorizontalShowcase from '../src/components/HorizontalShowcase'

import {MockMovie, MockTv} from '../src/graphql/mock'

jest.useFakeTimers()

const navigation = {
  navigate: jest.fn()
}

const footerOnPress = jest.fn()

test('Validate movie list', async () => {
  act(() => {
    const tree = create(
      <MockedProvider mocks={MockMovie} addTypename={false}>
        <MovieScreen navigation={navigation}/>
      </MockedProvider>
    )
    jest.runAllTimers()
    expect(tree).toMatchSnapshot()

    const buttonNowPlayingShowAll = tree.root.findByProps({testID: "ShowAllNowplaying"}).props
    buttonNowPlayingShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonPopularShowAll = tree.root.findByProps({testID: "ShowAllPopular"}).props
    buttonPopularShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonTopRatedShowAll = tree.root.findByProps({testID: "ShowAllTopRated"}).props
    buttonTopRatedShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonUpcomingShowAll = tree.root.findByProps({testID: "ShowAllUpcoming"}).props
    buttonUpcomingShowAll.onPress()
    expect(navigation.navigate).toBeCalled()
  })
})

test('Validate tv list', async () => {
  act(() => {
    const tree = create(
      <MockedProvider mocks={MockTv} addTypename={false}>
        <TvScreen navigation={navigation}/>
      </MockedProvider>
    )
    jest.runAllTimers()
    expect(tree).toMatchSnapshot()

    const buttonOnTheAirShowAll = tree.root.findByProps({testID: "ShowAllOnTheAir"}).props
    buttonOnTheAirShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonPopularTvShowAll = tree.root.findByProps({testID: "ShowAllPopularTv"}).props
    buttonPopularTvShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonTopRatedTvShowAll = tree.root.findByProps({testID: "ShowAllTopRatedTv"}).props
    buttonTopRatedTvShowAll.onPress()
    expect(navigation.navigate).toBeCalled()

    const buttonAirTodayShowAll = tree.root.findByProps({testID: "ShowAllAirToday"}).props
    buttonAirTodayShowAll.onPress()
    expect(navigation.navigate).toBeCalled()
  })
})

test('Validate horizontal showcase list', () => {
  const tree = create(
    <HorizontalShowcase
      navigation={navigation}
      show="movie"
      footerOnPress={footerOnPress}
      showcaseData={{"loading": false, "results": [{"backdrop_path": "/5UkzNSOK561c2QRy2Zr4AkADzLT.jpg", "genre_ids": [Array], "id": 528085, "overview": "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.", "popularity": 1549.992, "poster_path": "/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg", "release_date": "2020-10-01", "title": "2067", "vote_average": 5.7}, {"backdrop_path": "/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg", "genre_ids": [Array], "id": 337401, "overview": "When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.", "popularity": 936.725, "poster_path": "/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg", "release_date": "2020-09-04", "title": "Mulan", "vote_average": 7.3}, {"backdrop_path": "/pq0JSpwyT2URytdFG0euztQPAyR.jpg", "genre_ids": [Array], "id": 694919, "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.", "popularity": 880.735, "poster_path": "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg", "release_date": "2020-09-29", "title": "Money Plane", "vote_average": 6.1}, {"backdrop_path": "/54yOImQgj8i85u9hxxnaIQBRUuo.jpg", "genre_ids": [Array], "id": 539885, "overview": "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.", "popularity": 744.393, "poster_path": "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg", "release_date": "2020-07-02", "title": "Ava", "vote_average": 5.9}, {"backdrop_path": "/gEjNlhZhyHeto6Fy5wWy5Uk3A9D.jpg", "genre_ids": [Array], "id": 581392, "overview": "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.", "popularity": 641.633, "poster_path": "/sy6DvAu72kjoseZEjocnm2ZZ09i.jpg", "release_date": "2020-07-15", "title": "Peninsula", "vote_average": 7.1}, {"backdrop_path": "/t22fWbzdnThPseipsdpwgdPOPCR.jpg", "genre_ids": [Array], "id": 726739, "overview": "It's been ten years since the creation of the Great Truce, an elaborate joint-species surveillance system designed and monitored by cats and dogs to keep the peace when conflicts arise. But when a tech-savvy villain hacks into wireless networks to use frequencies only heard by cats and dogs, he manipulates them into conflict and the worldwide battle between cats and dogs is BACK ON. Now, a team of inexperienced and untested agents will have to use their old-school animal instincts to restore order and peace between cats and dogs everywhere.", "popularity": 443.937, "poster_path": "/4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg", "release_date": "2020-10-02", "title": "Cats & Dogs 3: Paws Unite", "vote_average": 6.5}, {"backdrop_path": "/r5srC0cqU36n38azFnCyReEksiR.jpg", "genre_ids": [Array], "id": 613504, "overview": "Tessa finds herself struggling with her complicated relationship with Hardin; she faces a dilemma that could change their lives forever.", "popularity": 371.194, "poster_path": "/kiX7UYfOpYrMFSAGbI6j1pFkLzQ.jpg", "release_date": "2020-09-02", "title": "After We Collided", "vote_average": 6.5}, {"backdrop_path": "/qsxhnirlp7y4Ae9bd11oYJSX59j.jpg", "genre_ids": [Array], "id": 446893, "overview": "Queen Poppy and Branch make a surprising discovery — there are other Troll worlds beyond their own, and their distinct differences create big clashes between these various tribes. When a mysterious threat puts all of the Trolls across the land in danger, Poppy, Branch, and their band of friends must embark on an epic quest to create harmony among the feuding Trolls to unite them against certain doom.", "popularity": 308.614, "poster_path": "/7W0G3YECgDAfnuiHG91r8WqgIOe.jpg", "release_date": "2020-03-12", "title": "Trolls World Tour", "vote_average": 7.6}, {"backdrop_path": "/4gKyQ1McHa8ZKDsYoyKQSevF01J.jpg", "genre_ids": [Array], "id": 425001, "overview": "Sixth-grader Peter is pretty much your average kid—he likes gaming, hanging with his friends and his beloved pair of Air Jordans. But when his recently widowed grandfather Ed  moves in with Peter’s family, the boy is forced to give up his most prized possession of all, his bedroom. Unwilling to let such an injustice stand, Peter devises a series of increasingly elaborate pranks to drive out the interloper, but Grandpa Ed won’t go without a fight.", "popularity": 268.898, "poster_path": "/ltyARDw2EFXZ2H2ERnlEctXPioP.jpg", "release_date": "2020-08-27", "title": "The War with Grandpa", "vote_average": 6.1}, {"backdrop_path": "/9guoVF7zayiiUq5ulKQpt375VIy.jpg", "genre_ids": [Array], "id": 592350, "overview": "Class 1-A visits Nabu Island where they finally get to do some real hero work. The place is so peaceful that it's more like a vacation … until they're attacked by a villain with an unfathomable Quirk! His power is eerily familiar, and it looks like Shigaraki had a hand in the plan. But with All Might retired and citizens' lives on the line, there's no time for questions. Deku and his friends are the next generation of heroes, and they're the island's only hope.", "popularity": 257.445, "poster_path": "/zGVbrulkupqpbwgiNedkJPyQum4.jpg", "release_date": "2019-12-20", "title": "My Hero Academia: Heroes Rising", "vote_average": 8.6}, {"backdrop_path": "/vghBAXOb9VlDkbjHBkoG19GAW8w.jpg", "genre_ids": [Array], "id": 667141, "overview": "It's 1998 and over the course of one 12-hour shift at an Arkansas hospital, a junkie nurse, her scheming cousin and a group of black market organ-trading criminals start a heist that could lead to their collective demise.", "popularity": 220.766, "poster_path": "/zDo6t0cgFVof4Pvu9BnkhGfDT79.jpg", "release_date": "2020-10-02", "title": "12 Hour Shift", "vote_average": 6.1}, {"backdrop_path": "/n1RohH2VoK1CdVI2fXvcP19dSlm.jpg", "genre_ids": [Array], "id": 531876, "overview": "A small unit of U.S. soldiers, alone at the remote Combat Outpost Keating, located deep in the valley of three mountains in Afghanistan, battles to defend against an overwhelming force of Taliban fighters in a coordinated attack. The Battle of Kamdesh, as it was known, was the bloodiest American engagement of the Afghan War in 2009 and Bravo Troop 3-61 CAV became one of the most decorated units of the 19-year conflict.", "popularity": 190.279, "poster_path": "/hPkqY2EMqWUnFEoedukilIUieVG.jpg", "release_date": "2020-06-24", "title": "The Outpost", "vote_average": 6.7}, {"backdrop_path": "/xUUtcxWC6H48UCrpRwwSPQz69XC.jpg", "genre_ids": [Array], "id": 659986, "overview": "A group of friends think they found the perfect easy score - an empty house with a safe full of cash. But when the elderly couple that lives there comes home early, the tables are suddenly turned. As a deadly game of cat and mouse ensues, the would-be thieves must fight to save themselves from a nightmare they could never have imagined.", "popularity": 139.752, "poster_path": "/gzFatNrw0lhKD5NxaU6zC7S2KjP.jpg", "release_date": "2020-08-27", "title": "The Owners", "vote_average": 5.7}, {"backdrop_path": "/wUP0KIAXcRevjjJpoSKT7LLhiaK.jpg", "genre_ids": [Array], "id": 479259, "overview": "Searching for escape in Tokyo's back alleys, a haunted English teacher explores love and lust with a dashing Yakuza, as their tumultuous affair takes her on a journey through the city's dive bars and three-hour love hotels.", "popularity": 173.457, "poster_path": "/vQgXwuJrlpzGDI8169tRQRy71Nv.jpg", "release_date": "2020-09-18", "title": "Lost Girls & Love Hotels", "vote_average": 5.2}, {"backdrop_path": "/AdqOBPw4PdtzOcfEuQuZ8MNeTKb.jpg", "genre_ids": [Array], "id": 413518, "overview": "In this live-action adaptation of the beloved fairytale, old woodcarver Geppetto fashions a wooden puppet, Pinocchio, who magically comes to life. Pinocchio longs for adventure and is easily led astray, encountering magical beasts, fantastical spectacles, while making friends and foes along his journey. However, his dream is to become a real boy, which can only come true if he finally changes his ways.", "popularity": 167.794, "poster_path": "/4w1ItwCJCTtSi9nPfJC1vU6NIVg.jpg", "release_date": "2019-12-19", "title": "Pinocchio", "vote_average": 6.8}, {"backdrop_path": "/oazPqs1z78LcIOFslbKtJLGlueo.jpg", "genre_ids": [Array], "id": 501979, "overview": "Yet to fulfill their rock and roll destiny, the now middle-aged best friends Bill and Ted set out on a new adventure when a visitor from the future warns them that only their song can save life as we know it. Along the way, they are helped by their daughters, a new batch of historical figures and a few music legends—to seek the song that will set their world right and bring harmony to the universe.", "popularity": 158.857, "poster_path": "/4V2nTPfeB59TcqJcUfQ9ziTi7VN.jpg", "release_date": "2020-08-27", "title": "Bill & Ted Face the Music", "vote_average": 6.3}, {"backdrop_path": "/rUeqBuNDR9zN6vZV9kpEFMtQm0E.jpg", "genre_ids": [Array], "id": 499932, "overview": "In Knockemstiff, Ohio and its neighboring backwoods, sinister characters converge around young Arvin Russell as he fights the evil forces that threaten him and his family.", "popularity": 163.782, "poster_path": "/7G2VvG1lU8q758uOqU6z2Ds0qpA.jpg", "release_date": "2020-09-11", "title": "The Devil All the Time", "vote_average": 7.4}, {"backdrop_path": "/kriOlxu4KVEjd0ZaY3dW7YYyP4z.jpg", "genre_ids": [Array], "id": 530723, "overview": "A superintendent of a school district works for the betterment of the student’s education when an embezzlement scheme is discovered, threatening to destroy everything.", "popularity": 151.914, "poster_path": "/gizz5FphOtfSnLaGpRALOZgILd5.jpg", "release_date": "2020-09-23", "title": "Bad Education", "vote_average": 6.8}, {"backdrop_path": "/wzJRB4MKi3yK138bJyuL9nx47y6.jpg", "genre_ids": [Array], "id": 577922, "overview": "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.", "popularity": 140.326, "poster_path": "/k68nPLbIST6NP96JmTxmZijEvCA.jpg", "release_date": "2020-08-22", "title": "Tenet", "vote_average": 7.5}, {"backdrop_path": "/5rwcd24GGltKiqdPT4G2dmchLr9.jpg", "genre_ids": [Array], "id": 579583, "overview": "Scott has been a case of arrested development ever since his firefighter father died when he was seven. He’s now reached his mid-20s having achieved little, chasing a dream of becoming a tattoo artist that seems far out of reach. As his ambitious younger sister heads off to college, Scott is still living with his exhausted ER nurse mother and spends his days smoking weed, hanging with the guys — Oscar, Igor and Richie — and secretly hooking up with his childhood friend Kelsey. But when his mother starts dating a loudmouth firefighter named Ray, it sets off a chain of events that will force Scott to grapple with his grief and take his first tentative steps toward moving forward in life.", "popularity": 138.484, "poster_path": "/zQFjMmE3K9AX5QrBL1SXIxYQ9jz.jpg", "release_date": "2020-07-22", "title": "The King of Staten Island", "vote_average": 6.8}]}}
    />
  )
  expect(tree).toMatchSnapshot()

  const buttonFooterShowAll = tree.root.findByProps({testID: "ShowAllFooter"}).props
  buttonFooterShowAll.onPress()
  expect(footerOnPress).toBeCalled()

  const detailPress = tree.root.findAllByProps({testID: "HorizontalTouchToDetail"})
  detailPress[0].props.onPress()
  expect(navigation.navigate).toBeCalled()
})