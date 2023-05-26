export default interface Weather {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	elevation: number;
	current_weather: {
		temperature: number;
		windspeed: number;
		winddirection: number;
		weathercode: number;
		is_day: number;
		time: string;
	};
	daily_units: {
		time: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
		weathercode: string;
	};
	daily: {
		time: string[];
	};
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	weathercode: number[];
}
