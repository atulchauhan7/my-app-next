import Navigation from './Navigation';

export default function UsersLayout({ children }) {
  return (
    <>
      <Navigation />
      <h1>Dashboard..<br /><br /></h1>
      {children}
    </>
  );
}