const ConstructionPage = () => {
  return (
    <div className='fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black font-mono'>
      <div className='relative z-10 min-h-screen flex items-center justify-center text-white'>
        <div className='text-center space-y-6 p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10'>
          <div className='text-6xl font-bold mb-4'>🚧</div>
          <h1 className='text-4xl font-bold mb-4'>
            Website Under Construction
          </h1>
          <p className='text-xl text-gray-300 max-w-md mx-auto'>
            This website is currently under construction. Please check back
            soon.
            <a href='mailto:Nahomberhane101@gmail.com'>
              Nahomberhane101@gmail.com
            </a>{' '}
          </p>
          <div className='mt-8'>
            <div className='animate-pulse text-sm text-gray-400'>
              Coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConstructionPage;
