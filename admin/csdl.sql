USE [master]
GO
/****** Object:  Database [api_pharma]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE DATABASE [api_pharma]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'api_pharma', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\api_pharma.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'api_pharma_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\api_pharma_log.ldf' , SIZE = 832KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [api_pharma] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [api_pharma].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [api_pharma] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [api_pharma] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [api_pharma] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [api_pharma] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [api_pharma] SET ARITHABORT OFF 
GO
ALTER DATABASE [api_pharma] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [api_pharma] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [api_pharma] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [api_pharma] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [api_pharma] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [api_pharma] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [api_pharma] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [api_pharma] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [api_pharma] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [api_pharma] SET  ENABLE_BROKER 
GO
ALTER DATABASE [api_pharma] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [api_pharma] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [api_pharma] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [api_pharma] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [api_pharma] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [api_pharma] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [api_pharma] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [api_pharma] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [api_pharma] SET  MULTI_USER 
GO
ALTER DATABASE [api_pharma] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [api_pharma] SET DB_CHAINING OFF 
GO
ALTER DATABASE [api_pharma] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [api_pharma] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [api_pharma] SET DELAYED_DURABILITY = DISABLED 
GO
USE [api_pharma]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NULL,
	[Gender] [nvarchar](max) NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[StreetAddress] [nvarchar](max) NULL,
	[State] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[Degree] [nvarchar](max) NULL,
	[Experience] [nvarchar](max) NULL,
	[IsApproved] [bit] NULL,
	[IsApplied] [bit] NOT NULL,
	[JobId] [int] NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [int] NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Categories]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](max) NULL,
	[CategoryDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
	[Country] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FeedBacks]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeedBacks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NULL,
	[Company] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[PostalCode] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Phone] [nvarchar](max) NULL,
	[Comments] [nvarchar](max) NULL,
	[IsApproved] [bit] NULL,
	[AppUserId] [int] NOT NULL,
 CONSTRAINT [PK_FeedBacks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobName] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Salary] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[IsAvailable] [bit] NOT NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PhotoProducts]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhotoProducts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PhotoProductUrl] [nvarchar](max) NULL,
	[PublicId] [nvarchar](max) NULL,
	[IsMain] [bit] NOT NULL,
	[ProductId] [int] NOT NULL,
 CONSTRAINT [PK_PhotoProducts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PhotoUsers]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhotoUsers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PhotoUserUrl] [nvarchar](max) NULL,
	[PublicId] [nvarchar](max) NULL,
	[IsMain] [bit] NOT NULL,
	[AppUserId] [int] NOT NULL,
 CONSTRAINT [PK_PhotoUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Products]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OutPut] [nvarchar](max) NULL,
	[CapsuleSize] [nvarchar](max) NULL,
	[MachineDimension] [nvarchar](max) NULL,
	[ShippingWeight] [nvarchar](max) NULL,
	[ModelNumber] [nvarchar](max) NULL,
	[Dies] [int] NOT NULL,
	[MaxPressure] [nvarchar](max) NULL,
	[MaxDiameter] [nvarchar](max) NULL,
	[MaxDepth] [nvarchar](max) NULL,
	[ProductionCapacity] [nvarchar](max) NULL,
	[MachineSize] [nvarchar](max) NULL,
	[NetWeight] [nvarchar](max) NULL,
	[CategoryId] [int] NOT NULL,
	[ProductName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 5/3/2021 4:20:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NickName] [nvarchar](max) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Rating] [int] NOT NULL,
	[IsApproved] [bit] NULL,
	[ProductId] [int] NOT NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210416031538_init', N'5.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210417042854_ProductName', N'5.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210417070005_ReviewIsApprovedNull', N'5.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210427025005_ProductChangeProperties_V1', N'5.0.5')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210501165508_isApproveAppUser', N'5.0.5')
SET IDENTITY_INSERT [dbo].[AspNetRoles] ON 

INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (1, N'Member', N'MEMBER', N'5a9c65f7-0e37-4fab-80c2-851adb00da99')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (2, N'Admin', N'ADMIN', N'1b92c145-6796-459c-8b9c-121fa986e71f')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (3, N'Moderator', N'MODERATOR', N'c43a97d8-5589-407f-ae9f-8e71acfa8c86')
SET IDENTITY_INSERT [dbo].[AspNetRoles] OFF
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (1, 2)
SET IDENTITY_INSERT [dbo].[AspNetUsers] ON 

INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Gender], [DateOfBirth], [StreetAddress], [State], [City], [Country], [Degree], [Experience], [IsApproved], [IsApplied], [JobId], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (1, N'Admin', NULL, CAST(N'0001-01-01 00:00:00.0000000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, N'Admin', N'ADMIN', N'admin@gmail.com', N'ADMIN@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAEJ1xI3TMy4H+uhmA0HRCpeRla5yxG2e9lBRxf07kdmvwxb2OrYgW8GGo1SSgcNmKvQ==', N'H32JVQAOVJYZYD35ANTI2LJHFHR2VU5V', N'd473b94f-0038-4199-ab5f-ca86d99e76c2', NULL, 0, 0, NULL, 1, 0)
SET IDENTITY_INSERT [dbo].[AspNetUsers] OFF
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [CategoryName], [CategoryDescription]) VALUES (1, N'Tablets Presses', N'LFA Tablet Press supplies, tablet, pill and pellet presses form R&D Hand Held models right up to full production capacity Rotary Tablet Presses.
Some of our most popular models include the Desk Top Presses which are fantastic for research departments and small batch production.
LFA Tablet Presses also supplies a small range of excipients that can be used in the tablet presses. This includes Firmapress our all in one tableting excipient that works with almost every API.')
INSERT [dbo].[Categories] ([Id], [CategoryName], [CategoryDescription]) VALUES (2, N'Capsule Fillers', N'LFA Capsule Fillers supplies, capsule fillers from small production runs and research and development models, that can do 100 capsules at a time, through to fully automatic capsule fullers for full-scale production.
Launched in 2018 it is the latest addition to the LFA family. Despite this being the case our engineers are fully trained on the machines and able to offer the same support and training that the would with the mixers and tablet presses.
LFA Capsule Fillers also offers a complete range of capsules for you to use in your machine. From 000 to 5 we stock all of the regular sizes and are able to offer them in a range of colours and materials. We are practically excited about the organic capsule that allows you as a producer to easily produce a fully organic product.')
INSERT [dbo].[Categories] ([Id], [CategoryName], [CategoryDescription]) VALUES (3, N'Mixing Machinery', N'LFA Mixers is a fully comprehensive one stop shop for all of your powder mixing needs. With a range of designs that includes V Mixers, Bin Mixers and Ribbon blenders whatever powder mixing challenges you’re facing we are sure to be able to help.
Originally included in the LFA Tablet Presses range we decided to separate out LFA Mixers in 2017 as our customer’s requirements became more diverse. Whether you’re mixing, capsule or tablet mixes, protein powders or industrial chemicals we believe that we can supply you with a mixer that can take on the challenge.
With over 10 years mixing powders we understand that every mix is different. We are happy to work with you to find the right grade steal, add in agitation bars and validate different mixing methods, essentially customising every mixer for your specific needs.')
SET IDENTITY_INSERT [dbo].[Categories] OFF
SET IDENTITY_INSERT [dbo].[Contacts] ON 

INSERT [dbo].[Contacts] ([Id], [Name], [Email], [Phone], [Country], [Description]) VALUES (1, N'tin duc', N'tinsatthu1988@gmail.com', N'0969765264', N'Việt Nam', N'this is description contact')
INSERT [dbo].[Contacts] ([Id], [Name], [Email], [Phone], [Country], [Description]) VALUES (3, N'tri', N'triacma8@gmail.com', N'0969765264', N'Việt Nam', N'call for me')
SET IDENTITY_INSERT [dbo].[Contacts] OFF
SET IDENTITY_INSERT [dbo].[FeedBacks] ON 

INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (1, N'tin', N'in song an', N'133 truong dang que', N'ho chi minh', N'70000', N'tinsatthu@gmail.com', N'0969765264', N'good', 1, 1)
INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (2, N'nam', N'in song tao', N'33 hanh thong', N'ho chi minh', N'70000', N'nam@gmail.com', N'0958652147', N'bad', NULL, 1)
INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (3, N'khuyen', N'in song an', N'133 truong dang que', N'ho chi minh', N'70000', N'khuyenle@gmail.com', N'0968598745', N'good', NULL, 1)
INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (4, N'tri', N'in lien son', N'20 nguyen binh khiem', N'ho chi minh', N'70000', N'tri@gmail.com', N'0859625741', N'good', NULL, 1)
INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (5, N'uyen', N'in song an', N'133 truong dang que', N'ho chi minh', N'70000', N'uyenmy@gmail.com', N'0147258963', N'bad', NULL, 1)
INSERT [dbo].[FeedBacks] ([Id], [FullName], [Company], [Address], [City], [PostalCode], [Email], [Phone], [Comments], [IsApproved], [AppUserId]) VALUES (6, N'tai', N'in lien son', N'20 nguyen binh khiem', N'ho chi minh', N'70000', N'taismile@gmail.com', N'0968598745', N'good', 0, 1)
SET IDENTITY_INSERT [dbo].[FeedBacks] OFF
SET IDENTITY_INSERT [dbo].[Jobs] ON 

INSERT [dbo].[Jobs] ([Id], [JobName], [Description], [Salary], [Quantity], [IsAvailable]) VALUES (1, N'Sales', N'this is Sale Job', 1000, 2, 1)
INSERT [dbo].[Jobs] ([Id], [JobName], [Description], [Salary], [Quantity], [IsAvailable]) VALUES (2, N'Director', N'this is director Job', 5000, 1, 0)
SET IDENTITY_INSERT [dbo].[Jobs] OFF
SET IDENTITY_INSERT [dbo].[PhotoProducts] ON 

INSERT [dbo].[PhotoProducts] ([Id], [PhotoProductUrl], [PublicId], [IsMain], [ProductId]) VALUES (1, N'https://www.lfatabletpresses.com/media/catalog/product/cache/8ca834c2aefe5a332c057aa7488b2959/t/d/tdp-6s-tablet-press-main_1.webp', NULL, 1, 1)
INSERT [dbo].[PhotoProducts] ([Id], [PhotoProductUrl], [PublicId], [IsMain], [ProductId]) VALUES (2, N'https://www.lfatabletpresses.com/media/catalog/product/cache/8ca834c2aefe5a332c057aa7488b2959/t/d/tdp-1.5-main.webp', NULL, 1, 2)
INSERT [dbo].[PhotoProducts] ([Id], [PhotoProductUrl], [PublicId], [IsMain], [ProductId]) VALUES (3, N'https://www.lfatabletpresses.com/media/catalog/product/cache/8ca834c2aefe5a332c057aa7488b2959/d/t/dtp-tablet-press-range.webp', NULL, 1, 3)
INSERT [dbo].[PhotoProducts] ([Id], [PhotoProductUrl], [PublicId], [IsMain], [ProductId]) VALUES (4, N'https://www.lfatabletpresses.com/media/catalog/product/cache/8ca834c2aefe5a332c057aa7488b2959/t/d/tdp-6s-tablet-press-main_1.webp', NULL, 1, 4)
INSERT [dbo].[PhotoProducts] ([Id], [PhotoProductUrl], [PublicId], [IsMain], [ProductId]) VALUES (5, N'https://www.lfatabletpresses.com/media/catalog/product/cache/8ca834c2aefe5a332c057aa7488b2959/t/d/tdp-6s-tablet-press-main_1.webp', NULL, 1, 5)
SET IDENTITY_INSERT [dbo].[PhotoProducts] OFF
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id], [OutPut], [CapsuleSize], [MachineDimension], [ShippingWeight], [ModelNumber], [Dies], [MaxPressure], [MaxDiameter], [MaxDepth], [ProductionCapacity], [MachineSize], [NetWeight], [CategoryId], [ProductName]) VALUES (1, N'30-50/min', N'2-6 mm', N'30 cm / 11.8 in x 22 cm / 8.6 in x 51 cm / 20 in', N'25.4 kg / 56 lbs', N'', 1, N'3.1 kN', N'5-10 mm', N'2-6 mm', N'', NULL, NULL, 1, N'TDP 0 Desktop Tablet Press')
INSERT [dbo].[Products] ([Id], [OutPut], [CapsuleSize], [MachineDimension], [ShippingWeight], [ModelNumber], [Dies], [MaxPressure], [MaxDiameter], [MaxDepth], [ProductionCapacity], [MachineSize], [NetWeight], [CategoryId], [ProductName]) VALUES (2, N'70,000 Capsules/hour', NULL, N'1500 mm (L) 1400 mm (W) 2500 mm (H)', NULL, N'AHCFM70', 0, NULL, NULL, NULL, N'1.5 H.P., 380/440 Volts, 3 Phase, 50 Hertz', NULL, N'1500 Kgs. Approx.', 2, N'Automatic High Speed Capsule Filling Machine')
INSERT [dbo].[Products] ([Id], [OutPut], [CapsuleSize], [MachineDimension], [ShippingWeight], [ModelNumber], [Dies], [MaxPressure], [MaxDiameter], [MaxDepth], [ProductionCapacity], [MachineSize], [NetWeight], [CategoryId], [ProductName]) VALUES (3, N'3000 capsules per hour', NULL, N'700* 800*1200 height', NULL, N'ACFMI', 0, NULL, NULL, NULL, N'4KW/3phase/440V/50Hz', NULL, NULL, 2, N'Automatic Capsule Filling Machinee')
INSERT [dbo].[Products] ([Id], [OutPut], [CapsuleSize], [MachineDimension], [ShippingWeight], [ModelNumber], [Dies], [MaxPressure], [MaxDiameter], [MaxDepth], [ProductionCapacity], [MachineSize], [NetWeight], [CategoryId], [ProductName]) VALUES (4, N'	36000 Capsules/hour', NULL, N'630 mm', NULL, N'RS9500', 0, NULL, NULL, NULL, N'0.25 H.P, 220 volts, Single phase, 50 Hertz', NULL, N'75 kgs approx.', 2, N'Automatic Capsule Loading Machine')
INSERT [dbo].[Products] ([Id], [OutPut], [CapsuleSize], [MachineDimension], [ShippingWeight], [ModelNumber], [Dies], [MaxPressure], [MaxDiameter], [MaxDepth], [ProductionCapacity], [MachineSize], [NetWeight], [CategoryId], [ProductName]) VALUES (5, N'500 litres (approximately 140 kg)', NULL, N'1,000mm x 1,700mm x 1,650mm', NULL, N'VH8', 0, NULL, NULL, NULL, N'1.5 H.P., 380/440 Volts, 3 Phase, 50 Hertz', NULL, N'approximately 900kg', 3, N'Rotary mixer VH')
SET IDENTITY_INSERT [dbo].[Products] OFF
SET IDENTITY_INSERT [dbo].[Reviews] ON 

INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (1, N'sukno', N'four star', N'Looks and works great.', 4, 1, 1)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (2, N'Johnny', N'Simple', N'Pretty simple design. Can''t see it going wrong. Delivery was quick.', 5, 0, 1)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (3, N'sonvt8', N'four star', N'Looks and works great.', 4, NULL, 2)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (4, N'sonvt7', N'four star', N'Looks and works great.', 4, NULL, 3)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (5, N'sonvt6', N'four star', N'Looks and works great.', 4, NULL, 4)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (6, N'sonvt5', N'five star', N'Best Product.', 5, NULL, 4)
INSERT [dbo].[Reviews] ([Id], [NickName], [Title], [Description], [Rating], [IsApproved], [ProductId]) VALUES (7, N'sonvt8', N'four star', N'Looks and works great.', 4, NULL, 5)
SET IDENTITY_INSERT [dbo].[Reviews] OFF
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [RoleNameIndex]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [EmailIndex]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUsers_JobId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUsers_JobId] ON [dbo].[AspNetUsers]
(
	[JobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UserNameIndex]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_FeedBacks_AppUserId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_FeedBacks_AppUserId] ON [dbo].[FeedBacks]
(
	[AppUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_PhotoProducts_ProductId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_PhotoProducts_ProductId] ON [dbo].[PhotoProducts]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_PhotoUsers_AppUserId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_PhotoUsers_AppUserId] ON [dbo].[PhotoUsers]
(
	[AppUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Products_CategoryId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_Products_CategoryId] ON [dbo].[Products]
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Reviews_ProductId]    Script Date: 5/3/2021 4:20:33 PM ******/
CREATE NONCLUSTERED INDEX [IX_Reviews_ProductId] ON [dbo].[Reviews]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Jobs_JobId] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Jobs_JobId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[FeedBacks]  WITH CHECK ADD  CONSTRAINT [FK_FeedBacks_AspNetUsers_AppUserId] FOREIGN KEY([AppUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FeedBacks] CHECK CONSTRAINT [FK_FeedBacks_AspNetUsers_AppUserId]
GO
ALTER TABLE [dbo].[PhotoProducts]  WITH CHECK ADD  CONSTRAINT [FK_PhotoProducts_Products_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PhotoProducts] CHECK CONSTRAINT [FK_PhotoProducts_Products_ProductId]
GO
ALTER TABLE [dbo].[PhotoUsers]  WITH CHECK ADD  CONSTRAINT [FK_PhotoUsers_AspNetUsers_AppUserId] FOREIGN KEY([AppUserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PhotoUsers] CHECK CONSTRAINT [FK_PhotoUsers_AspNetUsers_AppUserId]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories_CategoryId] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories_CategoryId]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Products_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Products_ProductId]
GO
USE [master]
GO
ALTER DATABASE [api_pharma] SET  READ_WRITE 
GO
