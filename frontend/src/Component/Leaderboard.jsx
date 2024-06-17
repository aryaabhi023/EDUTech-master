import { useState,useEffect } from "react"
import { getAllUsers } from "../Connection/auth"

export default function Leaderboard() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data);
    })},[]);
    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white dark:bg-zinc-800 shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-50 dark:bg-zinc-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      Username
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    <div className="flex items-center">
                      Score
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {users.length && users.map((user)=>(
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">@{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}