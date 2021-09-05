interface navbarButtonProps {
  active: boolean,
  text: string,
  block?: boolean
}

function NavbarButton({ active, text, block }: navbarButtonProps) {
  return (
    <>
    {
      active === false &&
      <a href="#" className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${block ? "block" : ""}`}>{text}</a>
    }
    {
      active === true &&
      <a href="#" className={`bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium ${block ? "block" : ""}`} aria-current="page">{text}</a>
    }
    </>
  )
}

export default NavbarButton
