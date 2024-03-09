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

const SearchComponent = ({ query, callback }: { query: string; callback: any }) => {
  const userToken = useSelector((state: any) => state.user.token)

  const [searchQuery, setSearchQuery] = useState("")

  const [searchUsers, setSearchUsers] = useState([])
  const [searchTrends, setSearchTrends] = useState([])
  const [searchAll, setSearchAll] = useState([])

  const q = useParams().query

  useEffect(() => {
    if (query !== "") setSearchQuery(query)
  }, [query])

  useEffect(() => {
    setSearchAll([...searchTrends, ...searchUsers])
  }, [searchTrends, searchUsers])

  const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: "Bearer " + userToken,
    },
  })

  const handleSearchTrends = (word: string) => {
    API.get(`tags/search?tag=${word}&page=1&count=3`)
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

  const handleSearchUsers = (word: string) => {
    API.get(`users/search?nameorusername=${word}&page=1&count=3`)
      .then((res) => {
        // console.log(res.data.data.users)
        setSearchUsers(res.data.data.users)
      })
      .catch((error) => {
        setSearchUsers([])
        if (error.response && error.response.status !== 404) {
          console.error(error)
        }
      })

    //     let us = res.data.results
    //     if (!preferences.showBlockedandMuted) {
    //       us = us.filter((r) => r.isBlocked === false)
  }

  const handleSearchChange = (word: string) => {
    callback(word)
    if (word !== "") {
      handleSearchTrends(word)
      handleSearchUsers(word)
    } else {
      setSearchUsers([])
      setSearchTrends([])
    }
  }

  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed", searchQuery)
      window.location.href = `/trending/${searchQuery}/diaries`
    }
  }

  useEffect(() => {
    if (q?.length && q.length > 0) {
      setSearchQuery(q)
      handleSearchChange(q)
      callback(q)
    }
  }, [q])

  //   useEffect(() => {
  //     if (searchQuery) console.log("searchQuery", searchQuery)
  //   }, [searchQuery])

  return (
    <div className="mt-2 flex w-full items-center justify-center" dir="ltr">
      <div className="w-[90%]">
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Autocomplete
            freeSolo
            blurOnSelect={false}
            renderGroup={(group) => {
              return (
                <div key={group.key}>
                  <span className="p-2 text-sm">{group.group}</span>
                  <div dir="ltr">{group.children}</div>
                </div>
              )
            }}
            groupBy={(option: any) => {
              if (option.username) {
                return t("users")
              } else {
                return t("trends")
              }
            }}
            disableClearable
            getOptionLabel={(option) => option?.username || searchQuery}
            options={searchAll}
            noOptionsText={"No options found"}
            renderOption={(props, option) => {
              return <li key={props.id}>{option.username ? <UserSearchComponent {...props} id={props.id} option={option} /> : <TrendSearchOption {...props} option={option} />}</li>
            }}
            renderInput={(params) => {
              return (
                <div key={params.id} className="w-full" ref={params.InputProps.ref}>
                  <TextField
                    label={t("search_placeholder")}
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value
                      setSearchQuery(value)
                      handleSearchChange(value)
                    }}
                    inputProps={{
                      onKeyDown: handleEnterKeyPress,
                      ...params.inputProps,
                    }}
                    InputLabelProps={{
                      style: { color: "#40e5da", textAlign: "right" },
                    }}
                    sx={{
                      borderColor: "#40e5da",

                      "& .MuiInputBase-input": {
                        borderColor: "#40e5da",
                        "&$focused": {
                          borderColor: "#40e5da",
                        },
                        color: "#40e5da",
                      },
                      width: "100%",
                      "& .MuiOutlinedInput-root:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#40e5da",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        borderColor: "#40e5da",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#40e5da",
                          "&$focused": {
                            borderColor: "#40e5da",
                          },
                        },
                      },
                      marginBottom: "10px",
                    }}
                  />
                </div>
              )
            }}
          />
        </Stack>
      </div>
    </div>
  )
}

export default SearchComponent
