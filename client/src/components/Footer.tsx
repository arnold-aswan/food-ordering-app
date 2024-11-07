const Footer = () => {
	return (
		<footer className="bg-orange-500 py-10">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center ">
				<h3 className="text-3xl text-white font-bold tracking-tight">
					MearnEats.com
				</h3>
				<div className="text-white font-bold tracking-tight flex gap-4">
					<h5>Privacy Policy</h5>
					<h5>Terms of Service</h5>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
