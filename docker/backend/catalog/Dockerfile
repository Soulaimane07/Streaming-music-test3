# Use the .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj file and restore dependencies
COPY ./backend/Catalog_Service/*.csproj ./
RUN dotnet restore

# Copy the entire source code and publish the app
COPY ./backend/Catalog_Service/. ./
RUN dotnet publish -c Release -o /app/publish

# Use the ASP.NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./

# Expose the correct port
EXPOSE 8080

# Run the application
ENTRYPOINT ["dotnet", "Catalog.Service.dll"]