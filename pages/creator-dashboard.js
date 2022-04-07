import { DashboardStyle } from './_app'

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image'
import Youtube from '../images/youtube.png'
import Twitch from '../images/twitch.png'
import Soundcloud from '../images/soundcloud.png'
import Music from '../images/music.png'
import Zoom from '../images/zoom.png'
import Spotify from '../images/spotify.png'
import Vivint from '../images/vivint.png'
import Ring from '../images/ring.png'
import Verkada from '../images/verkada.png'
import Gopro from '../images/gopro.png'
import Cctv from '../images/cctv.png'
import Tiktok from '../images/tiktok.png'

import {
  nftmarketaddress, nftaddress
} from '../config'

import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import router from 'next/router'

let magic;

export default function CreatorDashboard() {

  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [auth, setAuth] = useState(0)

  useEffect(() => {
    loadNFTs()
  }, [])


  var apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
  var apiKey = 'AIzaSyBmn9tD95L_dbCfy_VQ33kwoaQCo8l5IN4';
  var playlistId = 'PLjgIp1QrCmS7OsK50hC_o6EQ8bCumPXNg';

  const youtube_api = (e) => {


    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var options = {
      part: "snippet",
      playlistId: playlistId,
      key: apiKey,
      maxResults: 25
    };
    var defautVideoIndex = 0;
    fetch(`${apiUrl}?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=25`, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': 'https://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        // 'Access-Control-Allow-Headers': 'X-Requested-With'
      }
    }
    ).then(response => {

      // var item = response.items[defautVideoIndex];
      // var medium = item.snippet.thumbnails.medium;
      // var videoId = item.snippet.resourceId.videoId;
      console.log(JSON.stringify(response))

    });

  }

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)

    const data = await marketContract.fetchItemsCreated()
    const api = ""

    const call_API = () => {

      if (auth == 1) {
        api = "youtube_api";
      }
      else if (auth == 2) {
        api = "twitch_api";
      }
      console.log(api);
    }

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      console.log('Here are items++++++++++++++', item)
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }


  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)

  return (
    <div className="flex justify-center">
      <div
        className="rounded shadow-lg my-10 m-auto bg-gray-300 mt-30"
      >
        <div className=" mb-1 flex">
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
        </div>
        <div className="  mb-1 flex">
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
        </div>
        <div className="mb-1 flex">
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            <a href="https://accounts.google.com">
              <Image src={Music} className="picture" />
            </a>
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            {/* <a href="https://accounts.google.com"> */}
            <Image src={Music} className="picture" onClick={() => { }} />
            {/* </a> */}
          </div>
          <div className="bg-white  block border-solid m-1 col-2 items-center justify-center logos">
            {/* <a href="https://accounts.google.com"> */}
            <Image src={Music} className="picture" onClick={() => { youtube_api(1) }} />
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>

  )
} 