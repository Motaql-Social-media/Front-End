import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"

import UserSearchComponent from "./UserSearchOption"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import axios from "axios"
import TrendSearchOption from "./TrendSearchOption"

import React from "react"
import { TextField } from "@mui/material"
import { useParams } from "react-router-dom"
import { t } from "i18next"
import { styles } from "../../styles/styles"

const SearchComponent = ({ query, callback, fromMessage }: { query: string; callback: any; fromMessage: boolean }) => {
  const userToken = useSelector((state: any) => state.user.token)

  const [searchQuery, setSearchQuery] = useState("")

  const [searchUsers, setSearchUsers] = useState([])
  const [searchTrends, setSearchTrends] = useState([])

  const q = useParams().query

  useEffect(() => {
    if (query !== "") setSearchQuery(query)
  }, [query])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const handleSearchTrends = (word: string) => {
    if (!fromMessage)
      API.get(`tags/search?tag=${word}&page=1&count=5`)
        .then((res) => {
          // console.log(res.data.data.tags)
          setSearchTrends(res.data.data.tags)
        })
        .catch((error) => {
          setSearchTrends([])
          if (error.response && error.response.status !== 404) {
            console.error(error)
          }
        })
  }

  const user = useSelector((state: any) => state.user.user)

  const handleSearchUsers = (word: string) => {
    API.get(`users/search?nameorusername=${word}&page=1&count=5`)
      .then((res) => {
        // console.log(res.data.data.users)
        setSearchUsers(res.data.data.users.filter((u: any) => u.userId !== user.userId))
      })
      .catch((error) => {
        setSearchUsers([])
        if (error.response && error.response.status !== 404) {
          console.error(error)
        }
      })
  }

  const handleSearchChange = (word: string) => {
    // console.log("word", word)
    callback(word)
    if (word[0] === "#") {
      if (word.length > 1) {
        handleSearchTrends(word.slice(1))
        setSearchUsers([])
      }
    } else if (word !== "") {
      handleSearchTrends(word)
      handleSearchUsers(word)
    } else {
      setSearchUsers([])
      setSearchTrends([])
    }
  }

  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter" && searchQuery.length > 0) {
      // console.log("Enter key pressed", searchQuery)
      window.location.href = `/trending/${searchQuery[0] === "#" ? searchQuery.slice(1) : searchQuery}/diaries`
    }
  }

  useEffect(() => {
    if (q?.length && q.length > 0) {
      setSearchQuery(q)
      handleSearchChange(q)
      callback(q)
    }
  }, [q])

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (searchUsers.length > 0 || searchTrends.length > 0) setShowMenu(true)
    else setShowMenu(false)
  }, [searchUsers, searchTrends])

  useEffect(() => {
    if (!searchQuery) {
      setSearchUsers([])
      setSearchTrends([])
    }
  }, [searchQuery])

  useEffect(() => {
    setShowMenu(false)
  }, [])

  return (
    <div className=" mt-2 flex w-full items-center justify-center">
      <div className="relative w-[90%]">
        <TextField
          label={!fromMessage ? t("search_placeholder") : t("search_user")}
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value
            setSearchQuery(value)
            handleSearchChange(value)
          }}
          autoComplete="off"
          inputProps={{
            onKeyDown: handleEnterKeyPress,
            onBlur: () => {
              setTimeout(() => {
                setShowMenu(false)
              }, 300)
            },
            autoFocus: window.location.pathname.split("/")[1] === "trending" && true,
          }}
          InputLabelProps={{
            style: { color: "#40e5da", textAlign: "right" },
          }}
          sx={styles.textField}
        />
        {(searchUsers.length > 0 || searchTrends.length > 0) && showMenu && (
          <div className="absolute z-[99] w-full overflow-hidden rounded-lg border border-primary bg-black">
            {searchUsers.length > 0 && (
              <div className="border-b border-primary text-sm">
                <div className=" my-2 text-xl font-bold">{t("users")}</div>
                {searchUsers.map((user: any) => (
                  <div key={user.userId}>
                    <UserSearchComponent id={user.userId} option={user} fromMessage={fromMessage} />
                  </div>
                ))}
              </div>
            )}
            {searchTrends.length > 0 && (
              <div>
                <div className=" my-2 text-xl font-bold">{t("trends")}</div>
                {searchTrends.map((trend: any) => (
                  <div key={trend.tag}>
                    <TrendSearchOption option={trend} setShowMenu={setShowMenu} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchComponent
