export default function OutPrintList({data}) {

  return (
    data.map((obj) => {
      return (
        <tr key={obj.id} className='p-2'>
          <th scope="row" className='text-center p-2'>{obj.number}</th>
          <td className='text-center p-2'>{obj.groupName}</td>
          <td className='text-center p-2'>{obj.username}</td>
          <td className='p-2'>{obj.title}</td>
          <td className='p-2'></td>
        </tr>
      )
    })
  )
}