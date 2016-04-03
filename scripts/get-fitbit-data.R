library("fitbitScraper")
library("ggplot2")  
library(plyr)
library(dplyr)
cookie <- login(email="danalitovsky@gmail.com", password="amor19", rememberMe=TRUE)

# inspired by http://rforwork.info/2015/08/08/hey-fitbit-my-data-belong-to-me/

## get heart rate data every 5 minutes since I've had the fitbit
hr_data <- list(time = c(), hr = c())
startdate = as.Date('2015-04-01', format = "%Y-%m-%d")
enddate = Sys.Date()
#creates sequence of days from start to end
s = seq(startdate, enddate, by="days")

for (i in 1:length(s)) {
  #temporary df with each day
  df = get_intraday_data(cookie, "steps", date=sprintf("%s",s[i]))
  names(df) = c("time","hr")
  #combine temp df to final df and drop temporary df
  hr_data = rbind(hr_data, df)
  rm(df)}


## get daily steps data, seems to use different date format
startdate = as.character("2015-04-01")
enddate = as.character(Sys.Date())
steps_data <- get_daily_data(cookie, what = "steps", start_date=startdate, end_date = enddate)


#export data
write.csv(hr_data, file = "hr_data.csv")
write.csv(steps_data, file = "steps_data.csv")
