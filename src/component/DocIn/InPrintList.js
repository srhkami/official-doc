export default function InPrintList({data}) {

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id} className='p-2'>
          <th className='text-center p-2'>{obj.groupName}</th>
          <td className='text-center p-2'>{obj.number}</td>
          <td className='p-2'>{obj.title}</td>
          <td className='text-center p-2'>{obj.readDate}</td>
          <td className='text-center p-2'>{obj.username}</td>
        </tr>
      )
    })
  )
}