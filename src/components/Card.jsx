<Card
				key={index}
				className="w-80  dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-row justify-between"
			  >
				<CardHeader>
				  <CardTitle className="text-lg font-semibold">
					{pollutant.pollutant_id}
				  </CardTitle>
				</CardHeader>
				<CardContent className="flex justify-evenly">
				  
				  <p className="text-md text-gray-700 dark:text-gray-300">
					Avg:{" "}
					<span className="font-bold text-black dark:text-white">
					  {pollutant.avg_value}
					</span>
				  </p>
				
				</CardContent>
			  </Card>