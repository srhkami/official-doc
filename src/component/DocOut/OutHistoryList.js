export default function OutHistoryList({data}){

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id}>
          <th scope="row">{obj.number}</th>
          <td>{obj.groupName}</td>
          <td>{obj.title}</td>
          <td>{obj.username}</td>
          <td>{obj.reportDate}</td>
          <td>{obj.sendDate}</td>
          <td>
            {obj.status_display}
          </td>
        </tr>
      )
    })
  )
}