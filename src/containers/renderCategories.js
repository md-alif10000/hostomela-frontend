import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../urlconfig";

export const renderCategories = (categories) => {
	let myCategories = [];

	for (let category of categories) {
		myCategories.push(
			<Link
				to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
				className='text-white'>
				<li key={category.name} className='leftCategoryItem text-white'>
					{category.parentId ? (
						<Link
							className='text-white'
							style={{ textDecoration: "none" }}
							href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
							<ListItemText primary={category.name} />
						</Link>
					) : (
						<span>
							{category.categoryImage ? (
								<img
									style={{ width: "15px", height: "auto" }}
									src={generatePublicUrl(category.img)}
								/>
							) : null}

							<Link
								className='text-white'
								to={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
								{category.name}
							</Link>
						</span>
					)}

					{category.children ? (
						<ul>{renderCategories(category.children)}</ul>
					) : null}
				</li>
			</Link>
		);
	}
	return myCategories;
};
