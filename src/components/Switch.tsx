interface switchProps  {
  checkbox: Boolean,
  setCheckbox: Function
}

function Switch({ checkbox, setCheckbox }: switchProps) {
  return (
    <>
      <div className={`${checkbox ? 'bg-green-500' : 'bg-gray-600'} w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer`} onClick={() => setCheckbox(!checkbox)}>
        <div className={`bg-white w-5 h-5 rounded-full border-2 ${checkbox ? 'border-green-500' : 'border-gray-600'} absolute top-0 ${checkbox ? 'left-5' : 'left-0'} transition-all duration-300`}></div>
      </div>
    </>
  )
}

export default Switch
